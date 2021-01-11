import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenTabNavigator, SwipeScreenTabNavigator } from "./TabNavigator";
import ConversationScreen from "../screens/ConversationScreen";
import {
  setConversationScreenHeaders,
  setHomeScreenHeaders,
  setSmatchAccountScreenHeaders,
  setSwipeScreenHeaders,
} from "./utils/ScreensHeaders";
import { setStackNavBarProperties } from "./utils/NavBarProperties";
import SmatchAccountScreen from "../screens/SmatchAccountScreen";

const StackNavigator = createStackNavigator();

export function HomeScreenStackNavigator() {
  return (
    <StackNavigator.Navigator {...setStackNavBarProperties()}>
      <StackNavigator.Screen name="HomeScreen" component={HomeScreenTabNavigator} {...setHomeScreenHeaders()} />
      <StackNavigator.Screen name="SwipeScreen" component={SwipeScreenTabNavigator} {...setSwipeScreenHeaders()} />
      <StackNavigator.Screen name="ConversationScreen" component={ConversationScreen} {...setConversationScreenHeaders()} />
      <StackNavigator.Screen name="SmatchAccountScreen" component={SmatchAccountScreen} {...setSmatchAccountScreenHeaders()} />
    </StackNavigator.Navigator>
  );
}
