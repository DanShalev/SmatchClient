import React, {useRef, useState} from "react";
import { SafeAreaView, StyleSheet, View, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import Card from "./Card";
import {initAnimationProps, initAnimation, generateAnimationParams} from "../utils/swipingAnimationUtils"

export default function Profiles({ profilesProp }) {
  function functionConstructor() {
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
          {useNativeDriver: true},
      )
    }
  }

  const swipingEventTrigger = ([translationX]) => {
    const [lastProfile, ...restOfProfiles] = profiles;

    // Check user action (likes/noped profile card)
    let liked = translationX > 0;
    Alert.alert(`You ${liked ? "liked" : "noped"} ${lastProfile.name}!`);
    setProfiles(restOfProfiles);
  }

  function renderTopButtons() {
    return (
        <View style={styles.header}>
          <Icon
              name="user"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.topIconColor}
              onPress={() => {
                Alert.alert("Profile Button Pressed")
              }}
          />
          <Icon
              name="message-circle"
              size={nonCssStyles.icons.iconSize}
              color={nonCssStyles.icons.topIconColor}
              onPress={() => {
                Alert.alert("Message Box")
              }}
          />
        </View>

    );
  }

  function renderProfiles() {
    // Render Component
    const {likeOpacity, nopeOpacity, style} = generateAnimationParams(props.current);
    const {onGestureEvent} = props.current;
    const [lastProfile, ...restOfProfiles] = profiles;
    return lastProfile && (
        <View style={styles.cards}>
          {
            restOfProfiles.reverse().map(profile => (
                    <Card key={profile.id} {...{profile}} />
                )
            )
          }
          <PanGestureHandler
              onHandlerStateChange={onGestureEvent}
              {...{onGestureEvent}}
          >
            <Animated.View {...{style}}>
              <Card profile={lastProfile} {...{likeOpacity, nopeOpacity}} />
            </Animated.View>
          </PanGestureHandler>
        </View>
    );
  }

  function renderBottomButtons() {
    const [lastProfile, ...restOfProfiles] = profiles;
    return lastProfile && (
        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon
                name="x"
                size={nonCssStyles.icons.iconSize}
                color={nonCssStyles.icons.nopeIconColor}
                onPress={() => {
                  Alert.alert("Nope Pressed")
                }}
            />
          </View>
          <View style={styles.circle}>
            <Icon
                name="heart"
                size={nonCssStyles.icons.iconSize}
                color={nonCssStyles.icons.likeIconColor}
                onPress={() => {
                  Alert.alert("Like Pressed")
                }}
            />
          </View>
        </View>
    );
  }


  const [profiles, setProfiles] = useState(profilesProp);
  const props = useRef();  // Saves props once for all the times we re-render Profiles class (while using useState)

  functionConstructor();
  props.current = initAnimation(props.current, swipingEventTrigger);
  const profileCards = renderProfiles();

  return (
      <SafeAreaView style={styles.container}>
        {renderTopButtons()}
        {profileCards}
        {renderBottomButtons()}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    flex: 1,
    margin: 8,
    zIndex: 100,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});

const nonCssStyles = {
  icons: {
    iconSize: 32,
    nopeIconColor: "#ec5288",
    likeIconColor: "#6ee3b4",
    topIconColor: "gray"
  }
}
