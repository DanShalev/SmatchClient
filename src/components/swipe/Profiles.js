import React, {useRef, useState} from "react";
import {Alert, SafeAreaView, StyleSheet} from "react-native";
import Animated from "react-native-reanimated";
import {initAnimation, initAnimationProps} from "../utils/swipingAnimationUtils";
import {BottomButtons} from "./profileButtons/BottomButtons";
import {ProfileCards} from "./profileUtils/ProfileCards";
import {TopButtons} from "./profileButtons/TopButtons";

export default function Profiles({profilesProp}) {
  const [profiles, setProfiles] = useState(profilesProp);
  const props = useRef(); // Saves props once for all the times we re-render Profiles class (while using useState)

  initProps(props);
  props.current = initAnimation(props.current, swipingEventTrigger(profiles, setProfiles), setProfiles);

  return (
    <SafeAreaView style={styles.container}>
      <TopButtons/>
      <ProfileCards profiles={profiles} props={props.current}/>
      <BottomButtons profiles={profiles}/>
    </SafeAreaView>
  );
}

function swipingEventTrigger(profiles, setProfiles) {
  return ([translationX]) => {
    const [lastProfile, ...restOfProfiles] = profiles;

    // Check user action (likes/noped profile card)
    let liked = translationX > 0;
    Alert.alert(`You ${liked ? "liked" : "noped"} ${lastProfile.name}!`);
    setProfiles(restOfProfiles);
  }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  }
});

export const nonCssStyles = {
  icons: {
    iconSize: 32,
    nopeIconColor: "#ec5288",
    likeIconColor: "#6ee3b4",
    topIconColor: "gray",
  },
};