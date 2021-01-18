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

export function SwipeScreenTabNavigator({ route }) {
  return (
    <Tab.Navigator {...setTabNavigationProperties()}>
      <Tab.Screen name="Swipe" component={SwipeScreen} initialParams={{ profiles: route.params.profiles }} />
      <Tab.Screen name="Matches" component={MatchesScreen} initialParams={{ matches: route.params.matches }} />
    </Tab.Navigator>
  );
}
