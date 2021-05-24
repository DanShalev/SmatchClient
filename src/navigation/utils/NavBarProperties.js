import colors from "../../config/colors";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

export function NavBarProperties() {
  return {
    headerShown: true,
    headerTitle: null,
    gestureEnabled: true,
    headerStatusBarHeight: Platform === "android" ? 25 : 45,
    headerStyle: {
      backgroundColor: colors.primary,
    },
  };
}

export function setDrawerNavBarProperties() {
  return {
    drawerPosition: "right",
    screenOptions: () => NavBarProperties(),
  };
}

export function setStackNavBarProperties() {
  const gestureDisabledProps = { ...NavBarProperties(), gestureEnabled: false }; // Disable "go-back-swipe-gesture"

  return {
    screenOptions: () => gestureDisabledProps,
  };
}

export function setTabNavigationProperties() {
  return {
    tabBarOptions: {
      activeTintColor: colors.secondary,
      inactiveTintColor: colors.primary,
    },
    screenOptions: ({ route }) => {
      return {
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Groups") {
            iconName = "ios-people";
          } else if (route.name === "Browse") {
            iconName = "ios-search";
          } else if (route.name === "Profiles") {
            iconName = "ios-infinite";
          } else if (route.name === "Matches") {
            iconName = "ios-chatbubbles";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      };
    },
  };
}
