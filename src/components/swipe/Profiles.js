import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { initAnimation, initAnimationProps } from "../utils/SwipingAnimation";
import { BottomButtons } from "./profile-buttons/BottomButtons";
import { ProfileCards } from "./profile-utils/ProfileCards";
import { TopButtons } from "./profile-buttons/TopButtons";
import { MatchModal } from "./MatchModal";
import {connect} from "react-redux";
import {addMatch, removeFirstProfile} from "../../redux/actions/actionCreators";
import {insertDislike, insertLike} from "../../api/SmatchServerAPI";

function Profiles(props) {
  const [modalMatchData, setModalMatchData] = useState({});
  const [modalVisible, setModalState] = useState(false);
  const [manualSwipe, setManualSwipe] = useState(null);
  const {addMatch, authId, groups, removeFirstProfile, profiles} = props;
  const refProps = useRef(); // Saves props once for all the times we re-render Profiles class (while using useState)
  const currentGroupId = groups.currentGroupId;
  const currentProfiles = profiles.profiles[currentGroupId];
  initProps(refProps);
  refProps.current = initAnimation(refProps.current, swipingEventTrigger(currentProfiles, removeFirstProfile, setModalMatchData, addMatch, authId, currentGroupId, setModalState));

  const nextProfileExist = currentProfiles !== undefined && currentProfiles.length !== 0 ? currentProfiles[0] : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <TopButtons/>
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
              removeFirstProfile,
              setModalState,
              addMatch,
              authId,
              currentGroupId,
              initManualSwipe(setManualSwipe)
            )}
            onNopePressed={onNopeButtonPressed(removeFirstProfile, currentProfiles, currentGroupId, authId, initManualSwipe(setManualSwipe))}
          />
        </>
      ) : (
        <NoMoreSwipes />
      )}
      <MatchModal
        isVisible={modalVisible}
        matchProfileImage={modalMatchData.pictures ? modalMatchData.pictures[0] : null}
        onSwipeComplete={onModalSwipeCompleted(setModalState)}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  matches: state.matches,
  authId: state.authentication.id,
  profiles: state.profiles,
});

const mapDispatchToProps = (dispatch) => ({
  addMatch(groupId, userProfile) {
    dispatch(addMatch(groupId, userProfile));
  },
  removeFirstProfile(currentGroupId) {
    dispatch(removeFirstProfile(currentGroupId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);

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

function swipingEventTrigger(profiles, removeFirstProfile, setModalMatchData, addMatch, authId, currentGroupId, setModalState) {
  return ([translationX]) => {
    let liked = translationX > 0; // Check user action (likes/noped profile card)
    liked ? likeEventPostProcess(removeFirstProfile, profiles, setModalMatchData, addMatch, authId, currentGroupId, setModalState) : nopeEventPostProcess(removeFirstProfile, profiles, currentGroupId, authId);
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

function onLikeButtonPressed(profiles, setModalMatchData, removeFirstProfile, setModalState, addMatch, authId, currentGroupId, initManualSwipe) {
  return async () => {
    await initManualSwipe(true);
    await likeEventPostProcess(removeFirstProfile, profiles, setModalMatchData, addMatch, authId, currentGroupId, setModalState);
  };
}

function onNopeButtonPressed(removeFirstProfile, profiles, currentGroupId, authId, initManualSwipe) {
  return async () => {
    await initManualSwipe(false);
    await nopeEventPostProcess(removeFirstProfile, profiles, currentGroupId, authId);
  };
}

async function likeEventPostProcess(removeFirstProfile, profiles, setModalMatchData, addMatch, authId, currentGroupId, setModalState) {
  const [lastProfile] = profiles;

  let res = await insertLike(currentGroupId, authId, lastProfile.id);
  if (res.data) {
    addMatch(currentGroupId, lastProfile)
    setModalState(true)
    setModalMatchData(lastProfile);
  }
  removeFirstProfile(currentGroupId);
}

async function nopeEventPostProcess(removeFirstProfile, profiles, currentGroupId, authId) {
  const [lastProfile] = profiles;

  insertDislike(currentGroupId, authId, lastProfile.id).catch(error => console.log("Backend Error: " + error));
  removeFirstProfile(currentGroupId);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function NoMoreSwipes() {
  return (
    <View style={styles.noSwipesView}>
      <Text style={styles.noSwipesText}>No More Swipes!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  noSwipesView: {
    alignItems: "center",
  },
  noSwipesText: {
    fontSize: 40,
    color: "red",
    top: 200,
  },
});
