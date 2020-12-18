import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {setDrawerNavBarProperties, setBackArrowProperties} from "./utils/NavBarProperties"
import {HomeScreenTabNavigator} from "./TabNavigator";
import {CreateGroupScreen} from "../screens/CreateGroupScreen";

const Drawer = createDrawerNavigator();

export function DrawerNavigator() {
    return (
        <Drawer.Navigator {...setDrawerNavBarProperties()} >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Create Group" component={CreateGroupScreen} {...setBackArrowProperties()}/>
            <Drawer.Screen name="Settings" component={HomeScreen} />
            <Drawer.Screen name="About" component={HomeScreen} />
            <Drawer.Screen name="Log out" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;

function HomeScreen() {
    return <HomeScreenTabNavigator/>;
}
