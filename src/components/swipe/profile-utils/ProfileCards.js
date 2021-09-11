import {generateAnimationParams} from "../../utils/SwipingAnimation";
import {View} from "react-native";
import Card from "../Card";
import {PanGestureHandler} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import React from "react";
import styles from "./ProfileCardsStyle"

export function ProfileCards({profiles, onGestureEvent, translateX, translateY}) {
  const [lastProfile, ...restOfProfiles] = profiles;
  const {likeOpacity, nopeOpacity, style} = generateAnimationParams({translateX, translateY});

  return (
      <View style={styles.cards}>
        {restOfProfiles.slice(0, 1).reverse().map((profile) => (
            <Card key={profile.id} {...{profile}} />
        ))}
        <PanGestureHandler onHandlerStateChange={onGestureEvent} onGestureEvent={onGestureEvent}>
          <Animated.View {...{style}}>
            <Card profile={lastProfile} {...{likeOpacity, nopeOpacity}} />
          </Animated.View>
        </PanGestureHandler>
      </View>
  );
}
