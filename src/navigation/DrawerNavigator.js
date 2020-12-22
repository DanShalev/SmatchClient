import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { setDrawerNavBarProperties } from "./utils/NavBarProperties";
import { CreateGroupScreen } from "../screens/CreateGroupScreen";
import { HomeScreenStackNavigator } from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { setCreateGroupScreenHeaders, setSettingsScreenHeaders } from "./utils/ScreensHeaders";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator {...setDrawerNavBarProperties()}>
        <Drawer.Screen name="Home" component={HomeScreenStackNavigator} {...disableDrawerNavBar()} />
        <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setCreateGroupScreenHeaders()} />
        <Drawer.Screen name="Settings" component={SettingsScreen} {...setSettingsScreenHeaders()} />
        <Drawer.Screen name="About" component={SettingsScreen} {...setSettingsScreenHeaders()} />
        <Drawer.Screen name="Log out" component={SettingsScreen} {...setSettingsScreenHeaders()}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function disableDrawerNavBar() {
  return {
    options: {
      headerShown: false,
    },
  };
}
