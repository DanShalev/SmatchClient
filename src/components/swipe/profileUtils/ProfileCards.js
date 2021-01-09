import {generateAnimationParams} from "../../utils/swipingAnimationUtils";
import {StyleSheet, View} from "react-native";
import Card from "../Card";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import React from "react";

export function ProfileCards({profiles, props}) {
  const {likeOpacity, nopeOpacity, style} = generateAnimationParams(props);
  const {onGestureEvent} = props;
  const [lastProfile, ...restOfProfiles] = profiles;
  return (
    lastProfile && (
      <View style={styles.cards}>
        {restOfProfiles.reverse().map((profile) => (
          <Card key={profile.id} {...{profile}} />
        ))}
        <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{onGestureEvent}}>
          <Animated.View {...{style}}>
            <Card profile={lastProfile} {...{likeOpacity, nopeOpacity}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
    )
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
  }
});