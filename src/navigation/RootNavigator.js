import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../navigation/DrawerNavigator";
import {setStackNavBarProperties, disableMainStackNavBar, setBackArrowProperties} from "./utils/NavBarProperties";
import { SwipeScreenTabNavigator} from "./TabNavigator";

const AllAppNavigation = createStackNavigator();

const RootNavigator = () => (
    <NavigationContainer>
        <AllAppNavigation.Navigator {...setStackNavBarProperties()}>
            <AllAppNavigation.Screen name="MainScreenDrawer" children={DrawerNavigator} {...disableMainStackNavBar()} />
            <AllAppNavigation.Screen name="SwipeScreen" children={SwipeTabs} {...setBackArrowProperties()} />
        </AllAppNavigation.Navigator>
    </NavigationContainer>
);
export default RootNavigator;

function SwipeTabs() {
    return <SwipeScreenTabNavigator/>;
}
