import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: true }}
      drawerPosition="right"
    >
      <Drawer.Screen name="Create group" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={HomeScreen} />
      <Drawer.Screen name="About" component={HomeScreen} />
      <Drawer.Screen name="Log out" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
