import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseScreen from "../screens/BrowseScreen";
import GroupsScreen from "../screens/GroupsScreen";
import { setTabNavigationProperties } from "./utils/NavBarProperties";
import SwipeScreen from "../screens/SwipeScreen";
import MatchesScreen from "../screens/MatchesScreen";

const Tab = createBottomTabNavigator();

export function HomeScreenTabNavigator() {
  return (
    <Tab.Navigator {...setTabNavigationProperties()}>
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Browse" component={BrowseScreen} />
    </Tab.Navigator>
  );
}

export function SwipeScreenTabNavigator() {
  return (
    <Tab.Navigator {...setTabNavigationProperties()}>
      <Tab.Screen name="Swipe" component={SwipeScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
    </Tab.Navigator>
  );
}
