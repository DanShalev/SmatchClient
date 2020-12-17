import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import NavBar from "../screenUtils/NavBar";
import HomeScreen from "../screens/HomeScreen";
import { CreateGroupScreen } from "../screens/CreateGroup";
import SwipeScreen from "../screens/SwipeScreen";

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={(navigation) => NavBar(navigation)}
            drawerPosition="right"
        >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={HomeScreen} />
            <Drawer.Screen name="Create group" component={CreateGroupScreen} />
            <Drawer.Screen name="About" component={HomeScreen} />
            <Drawer.Screen name="Swipe Screen" component={SwipeScreen} />
            <Drawer.Screen name="Log out" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
