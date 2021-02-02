import Animated from "react-native-reanimated";
import React from "react";
import { State } from "react-native-gesture-handler";
import { Dimensions, StyleSheet } from "react-native";
const {
  add,
  multiply,
  neq,
  spring,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

const { width, height } = Dimensions.get("window");
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};
const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

function runSpringAnimation(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

export function initAnimationProps() {
  return {
    translationX: new Value(0),
    translationY: new Value(0),
    velocityX: new Value(0),
    offsetY: new Value(0),
    offsetX: new Value(0),
    gestureState: new Value(State.UNDETERMINED),
  };
}

export function initAnimation(props, swipingEventTrigger) {
  const clockX = new Clock();
  const clockY = new Clock();
  const { translationX, translationY, velocityX, gestureState, offsetY, offsetX } = props;
  gestureState.setValue(State.UNDETERMINED);
  translationX.setValue(0);
  translationY.setValue(0);
  velocityX.setValue(0);
  offsetY.setValue(0);
  offsetX.setValue(0);

  const finalTranslateX = add(translationX, multiply(0.2, velocityX));
  const translationThreshold = width / 4;
  const snapPoint = cond(
    lessThan(finalTranslateX, -translationThreshold),
    -rotatedWidth,
    cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0)
  );

  props.translateY = cond(
    eq(gestureState, State.END),
    [set(translationY, runSpringAnimation(clockY, translationY, 0)), set(offsetY, translationY), translationY],
    cond(eq(gestureState, State.BEGAN), [stopClock(clockY), translationY], translationY)
  );
  props.translateX = cond(
    eq(gestureState, State.END),
    [
      set(translationX, runSpringAnimation(clockX, translationX, snapPoint)),
      set(offsetX, translationX),
      cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [call([translationX], swipingEventTrigger)]),
      translationX,
    ],
    cond(eq(gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX)
  );

  return props;
}

export function generateAnimationParams({translateX, translateY}) {
  const rotateZ = concat(
    interpolate(translateX, {
      inputRange: [-width / 2, width / 2],
      outputRange: [15, -15],
      extrapolate: Extrapolate.CLAMP,
    }),
    "deg"
  );

  return {
    likeOpacity: interpolate(translateX, {
      inputRange: [0, width / 4],
      outputRange: [0, 1],
    }),
    nopeOpacity: interpolate(translateX, {
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
    }),
    style: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 900,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    },
  };
}
