import React, { useRef, useState } from "react";
import {Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Animated from "react-native-reanimated";

import { initAnimation, initAnimationProps } from "../components/utils/SwipingAnimation";
import { BottomButtons } from "../components/swipe/profile-buttons/BottomButtons";
import { ProfileCards } from "../components/swipe/profile-utils/ProfileCards";
import { MatchModal } from "../components/swipe/MatchModal";
import { useDispatch, useSelector } from "react-redux";
import {insertDislike, insertLike, updateGroupsProfilesAndMatches} from '../api/SmatchServerAPI';
import { selectCurrentUserData, selectUserFacebookId } from "../redux/slices/authSlice";
import { addToGroupSmatchBadge, selectCurrentGroupId } from "../redux/slices/groupsSlice";
import { removeFirstProfile, selectProfiles } from "../redux/slices/profilesSlice";
import { addMatch, selectMatches } from "../redux/slices/matchesSlice";

export default function ProfilesScreen() {
  const [modalMatchData, setModalMatchData] = useState({});
  const [modalVisible, setModalState] = useState(false);
  const [manualSwipe, setManualSwipe] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const refProps = useRef(); // Saves props once for all the times we re-render Profiles class (while using useState)
  const authId = useSelector(selectUserFacebookId);
  const currentGroupId = useSelector(selectCurrentGroupId);
  const currentUserData = useSelector(selectCurrentUserData);
  const profiles = useSelector(selectProfiles);
  const currentUserProfileImage = currentUserData.pictures[0];

  const currentProfiles = profiles[currentGroupId];
  const dispatch = useDispatch();
  const matches = useSelector(selectMatches);

  initProps(refProps);
  refProps.current = initAnimation(
    refProps.current,
    swipingEventTrigger(currentProfiles, dispatch, setModalMatchData, authId, currentGroupId, setModalState)
  );

  const nextProfileExist = currentProfiles !== undefined && currentProfiles.length !== 0 ? currentProfiles[0] : undefined;

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    updateGroupsProfilesAndMatches(authId, dispatch, currentGroupId, matches);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);


  return (
    <SafeAreaView style={styles.container} >
      {nextProfileExist ? (
        <>
          <ProfileCards
            profiles={currentProfiles}
            onGestureEvent={refProps.current.onGestureEvent}
            translateX={manualSwipe ? manualSwipe.translateX : refProps.current.translateX}
            translateY={manualSwipe ? manualSwipe.translateY : refProps.current.translateY}
          />
          <BottomButtons
            onLikePressed={onLikeButtonPressed(
              currentProfiles,
              setModalMatchData,
              dispatch,
              setModalState,
              addMatch,
              authId,
              currentGroupId,
              initManualSwipe(setManualSwipe)
            )}
            onNopePressed={onNopeButtonPressed(
              dispatch,
              currentProfiles,
              currentGroupId,
              authId,
              initManualSwipe(setManualSwipe)
            )}
          />
        </>
      ) : (
          <ScrollView style={styles.errorContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <NoMoreSwipes />
          </ScrollView>
      )}
      <MatchModal
        isVisible={modalVisible}
        currentUserProfileImage={currentUserProfileImage}
        matchProfileImage={modalMatchData.pictures ? modalMatchData.pictures[0] : null}
        onSwipeComplete={onModalSwipeCompleted(setModalState)}
      />
    </SafeAreaView>
  );
}

function initProps(props) {
  if (!props.current) {
    props.current = initAnimationProps();
    props.current.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: props.current.translationX,
            translationY: props.current.translationY,
            velocityX: props.current.velocityX,
            state: props.current.gestureState,
          },
        },
      ],
      { useNativeDriver: true }
    );
  }
}

function swipingEventTrigger(profiles, dispatch, setModalMatchData, authId, currentGroupId, setModalState) {
  return ([translationX]) => {
    let liked = translationX > 0; // Check user action (likes/noped profile card)
    liked
      ? likeEventPostProcess(dispatch, profiles, setModalMatchData, authId, currentGroupId, setModalState)
      : nopeEventPostProcess(dispatch, profiles, currentGroupId, authId);
  };
}

function initManualSwipe(setManualSwipe) {
  return async (swipeDirectionRight) => {
    const swipeToXYCord = 350; // Position to which the "manual swipe" will go to. (100,100) or (-100, -100)
    const stepSize = 100; // the smaller this params is, the smoother the transition - and the more times this component rerender.

    for (let i = 0; Math.abs(i) < swipeToXYCord; ) {
      i += swipeDirectionRight ? stepSize : -1 * stepSize;

      setManualSwipe({
        translateX: i,
        translateY: -1 * Math.abs(i),
      });

      await sleep(10);
    }

    setManualSwipe(null);
  };
}

function onModalSwipeCompleted(setModalState) {
  return () => {
    setModalState(false);
  };
}

function onLikeButtonPressed(
  profiles,
  setModalMatchData,
  dispatch,
  setModalState,
  addMatch,
  authId,
  currentGroupId,
  initManualSwipe
) {
  return async () => {
    await initManualSwipe(true);
    await likeEventPostProcess(dispatch, profiles, setModalMatchData, addMatch, authId, currentGroupId, setModalState);
  };
}

function onNopeButtonPressed(dispatch, profiles, currentGroupId, authId, initManualSwipe) {
  return async () => {
    await initManualSwipe(false);
    await nopeEventPostProcess(dispatch, profiles, currentGroupId, authId);
  };
}

async function likeEventPostProcess(dispatch, profiles, setModalMatchData, authId, currentGroupId, setModalState) {
  const [lastProfile] = profiles;

  let res = await insertLike(currentGroupId, authId, lastProfile.id);
  if (res.data) {
    dispatch(addMatch({match: lastProfile, currentGroupId: currentGroupId}));
    dispatch(addToGroupSmatchBadge({groupId: currentGroupId}));
    setModalState(true);
    setModalMatchData(lastProfile);
  }
  dispatch(removeFirstProfile({currentGroupId: currentGroupId}));
}

async function nopeEventPostProcess(dispatch, profiles, currentGroupId, authId) {
  const [lastProfile] = profiles;

  insertDislike(currentGroupId, authId, lastProfile.id).catch((error) => console.log("Backend Error: " + error));
  dispatch(removeFirstProfile({currentGroupId: currentGroupId}));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function NoMoreSwipes() {
  return (
      <View>
        <Image style={styles.errorImage} source={require("../../assets/emptyProfiles.png")} />
        <Text style={styles.errorText}>Currently no profiles to display</Text>
        <Text style={styles.errorText}>Pull to refresh</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  errorImage: {
    marginTop: 30,
    marginLeft: 60,
    width: 300,
    height: 300,
  },
  errorText: {
    marginTop: 50,
    fontSize: 15,
    textAlign: "center",
  },
});
