import React, {useRef, useState} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import Animated from "react-native-reanimated";

import {initAnimation, initAnimationProps} from "../utils/swipingAnimationUtils";
import {BottomButtons} from "./profileButtons/BottomButtons";
import {ProfileCards} from "./profileUtils/ProfileCards";
import {TopButtons} from "./profileButtons/TopButtons";
import {MatchModal} from "./MatchModal";

export default function Profiles({profilesProp}) {
  const [profiles, setProfiles] = useState(profilesProp);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMatchData, setModalMatchData] = useState({});
  const [manualSwipe, setManualSwipe] = useState(null);

  const props = useRef(); // Saves props once for all the times we re-render Profiles class (while using useState)

  initProps(props);
  props.current = initAnimation(props.current, swipingEventTrigger(profiles, setProfiles, setModalMatchData), setProfiles);

  const nextProfileExist = profiles[0];
  return (
    <SafeAreaView style={styles.container}>
      <TopButtons/>
      {nextProfileExist ?
          (<>
                <ProfileCards
                    profiles={profiles}
                    onGestureEvent={props.current.onGestureEvent}
                    translateX={manualSwipe ? manualSwipe.translateX : props.current.translateX}
                    translateY={manualSwipe ? manualSwipe.translateY : props.current.translateY}
                />
                <BottomButtons
                    onLikePressed={onLikeButtonPressed(setProfiles, profiles, setIsModalVisible, setModalMatchData, initManualSwipe(setManualSwipe))}
                    onNopePressed={onNopeButtonPressed(setProfiles, profiles, initManualSwipe(setManualSwipe))}
                />
          </>) :
          <NoMoreSwipes/>
      }
      <MatchModal
          isVisible={isModalVisible}
          matchProfileImage={modalMatchData.profile}
          onSwipeComplete={onModalSwipeCompleted(setIsModalVisible)}
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
      {useNativeDriver: true}
    );
  }
}

function swipingEventTrigger(profiles, setProfiles, setModalMatchData) {
  return ([translationX]) => {
    let liked = translationX > 0;  // Check user action (likes/noped profile card)
    liked ? likeEventPostProcess(setProfiles, profiles, setModalMatchData) : nopeEventPostProcess(setProfiles, profiles);
  }
}

function initManualSwipe(setManualSwipe) {
  return async (swipeDirectionRight) => {
    const swipeToXYCord = 350;  // Position to which the "manual swipe" will go to. (100,100) or (-100, -100)
    const stepSize = 100;  // the smaller this params is, the smoother the transition - and the more times this component rerender.

    for (let i = 0; Math.abs(i) < swipeToXYCord; ) {
      i += swipeDirectionRight ? stepSize : (-1 * stepSize);

      setManualSwipe({
        translateX: i,
        translateY: -1 * Math.abs(i)
      });

      await sleep(10);
    }

    setManualSwipe(null);
  }
}

function onModalSwipeCompleted(setIsModalVisible) {
  return () => {
    setIsModalVisible(false);
  }
}

function onLikeButtonPressed(setProfiles, profiles, setIsModalVisible, setModalMatchData, initManualSwipe) {
  return async () => {
    await initManualSwipe(true);
    likeEventPostProcess(setProfiles, profiles, setModalMatchData);
    setIsModalVisible(true);
  }
}

function onNopeButtonPressed(setProfiles, profiles, initManualSwipe) {
  return async () => {
    await initManualSwipe(false);
    nopeEventPostProcess(setProfiles, profiles);
  }
}

function likeEventPostProcess(setProfiles, profiles, setModalMatchData) {
  const [lastProfile, ...restOfProfiles] = profiles;

  // TODO - like event server process should start here
  // Alert.alert("Like Pressed");
  setProfiles(restOfProfiles);
  setModalMatchData(lastProfile);
}

function nopeEventPostProcess(setProfiles, profiles) {
  const [lastProfile, ...restOfProfiles] = profiles;

  // TODO - nope event server process should start here
  // Alert.alert("Nope Pressed");
  setProfiles(restOfProfiles);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    alignItems: "center"
  },
  noSwipesText: {
    fontSize: 40,
    color: "red",
    top: 200
  }
});
