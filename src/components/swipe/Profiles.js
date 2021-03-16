import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { initAnimation, initAnimationProps } from "../utils/SwipingAnimation";
import { BottomButtons } from "./profile-buttons/BottomButtons";
import { ProfileCards } from "./profile-utils/ProfileCards";
import { TopButtons } from "./profile-buttons/TopButtons";
import { MatchModal } from "./MatchModal";
import { connect } from "react-redux";
import { addMatch, removeFirstProfile, setModalVisible } from "../../redux/actions/actionCreators";

function Profiles({ groupsInfo, removeLastProfile, setModalState, modalVisible, addMatch }) {
  const [modalMatchData, setModalMatchData] = useState({});
  const [manualSwipe, setManualSwipe] = useState(null);

  const props = useRef(); // Saves props once for all the times we re-render Profiles class (while using useState)

  const profiles = groupsInfo.groupsProfiles[groupsInfo.currentGroupId];

  initProps(props);
  props.current = initAnimation(props.current, swipingEventTrigger(profiles, removeLastProfile, setModalMatchData));

  const nextProfileExist = profiles !== undefined && profiles.length !== 0 ? profiles[0] : undefined;

  return (
    <SafeAreaView style={styles.container}>
      <TopButtons />
      {nextProfileExist ? (
        <>
          <ProfileCards
            profiles={profiles}
            onGestureEvent={props.current.onGestureEvent}
            translateX={manualSwipe ? manualSwipe.translateX : props.current.translateX}
            translateY={manualSwipe ? manualSwipe.translateY : props.current.translateY}
          />
          <BottomButtons
            onLikePressed={onLikeButtonPressed(
              removeLastProfile,
              profiles,
              addMatch,
              setModalState,
              setModalMatchData,
              initManualSwipe(setManualSwipe)
            )}
            onNopePressed={onNopeButtonPressed(removeLastProfile, profiles, initManualSwipe(setManualSwipe))}
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
  groupsInfo: state.groupsInfo,
  modalVisible: state.modalVisible.modalVisible,
  matches: state.matches,
});

const mapDispatchToProps = (dispatch) => ({
  setModalState(isVisible) {
    dispatch(setModalVisible(isVisible));
  },
  addMatch(matchId, groupId, matchUserId) {
    dispatch(addMatch(matchId, groupId, matchUserId));
  },
  removeLastProfile() {
    dispatch(removeFirstProfile());
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

function swipingEventTrigger(profiles, removeLastProfile, setModalMatchData) {
  return ([translationX]) => {
    let liked = translationX > 0; // Check user action (likes/noped profile card)
    liked ? likeEventPostProcess(removeLastProfile, profiles, setModalMatchData) : nopeEventPostProcess(removeLastProfile, profiles);
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

function onLikeButtonPressed(removeLastProfiles, profiles, addMatch, setModalState, setModalMatchData, initManualSwipe) {
  return async () => {
    await initManualSwipe(true);
    likeEventPostProcess(removeLastProfiles, profiles, setModalMatchData, addMatch);
    setModalState(true);
  };
}

function onNopeButtonPressed(removeLastProfiles, profiles, initManualSwipe) {
  return async () => {
    await initManualSwipe(false);
    nopeEventPostProcess(removeLastProfiles, profiles);
  };
}

function likeEventPostProcess(removeLastProfile, profiles, setModalMatchData, addMatch) {
  const [lastProfile, ...restOfProfiles] = profiles;
  // TODO - like event server process should start here
  // Alert.alert("Like Pressed");
  removeLastProfile();
  setModalMatchData(lastProfile);
  //TODO - match stores in redux here
  // addMatch(generateId(), selfId, profile.userId)
}

function nopeEventPostProcess(removeLastProfile) {
  // TODO - nope event server process should start here
  // Alert.alert("Nope Pressed");
  removeLastProfile();
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
