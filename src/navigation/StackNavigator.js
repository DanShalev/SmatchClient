import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreenTabNavigator, SwipeScreenTabNavigator } from "./TabNavigator";
import ConversationScreen from "../screens/ConversationScreen";
import { setConversationScreenHeaders, setHomeScreenHeaders, setSwipeScreenHeaders } from "./utils/ScreensHeaders";
import { setStackNavBarProperties } from "./utils/NavBarProperties";

const StackNavigator = createStackNavigator();

export function HomeScreenStackNavigator() {
  return (
    <StackNavigator.Navigator {...setStackNavBarProperties()}>
      <StackNavigator.Screen name="HomeScreen" component={HomeScreenTabNavigator} {...setHomeScreenHeaders()} />
      <StackNavigator.Screen name="SwipeScreen" component={SwipeScreenTabNavigator} {...setSwipeScreenHeaders()} />
      <StackNavigator.Screen name="ConversationScreen" component={ConversationScreen} {...setConversationScreenHeaders()} />
    </StackNavigator.Navigator>
  );
}
