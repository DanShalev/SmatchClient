import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { setDrawerNavBarProperties } from "./utils/NavBarProperties";
import { CreateGroupScreen } from "../screens/CreateGroupScreen";
import { HomeScreenStackNavigator } from "./StackNavigator";
import {
  setCreateGroupScreenHeaders,
  setSettingsScreenHeaders,
  setAccountScreenHeaders,
  setAboutScreenHeaders,
} from "./utils/ScreensHeaders";
import SettingsScreen from "../screens/SettingsScreen";
import AboutScreen from "../screens/AboutScreen";
import AccountScreen from "../screens/AccountScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
      <Drawer.Navigator {...setDrawerNavBarProperties()}>
        <Drawer.Screen name="Home" component={HomeScreenStackNavigator} {...disableDrawerNavBar()} />
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setCreateGroupScreenHeaders()} />
        <Drawer.Screen name="Settings" component={SettingsScreen} {...setSettingsScreenHeaders()} />
        <Drawer.Screen name="About" component={AboutScreen} {...setAboutScreenHeaders()} />
        <Drawer.Screen name="Account" component={AccountScreen} {...setAccountScreenHeaders()} />
        <Drawer.Screen name="Log out" component={SettingsScreen} {...setSettingsScreenHeaders()} />
      </Drawer.Navigator>
  );
}

function disableDrawerNavBar() {
  return {
    options: {
      headerShown: false,
    },
  };
}
