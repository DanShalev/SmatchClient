import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BrowseScreen from "../screens/BrowseScreen";
import GroupsScreen from "../screens/GroupsScreen";
import { setTabNavigationProperties } from "./utils/NavBarProperties";
import MatchesScreen from "../screens/MatchesScreen";
import ProfilesScreen from "../screens/ProfilesScreen";

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
      <Tab.Screen name="Profiles" component={ProfilesScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
    </Tab.Navigator>
  );
}
