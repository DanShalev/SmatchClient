import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../navigation/DrawerNavigator";
import {setStackNavBarProperties, disableMainStackNavBar, setBackArrowProperties} from "./utils/NavBarProperties";
import { SwipeScreenTabNavigator} from "./TabNavigator";
import ConversationScreen from "../screens/ConversationScreen";

const AllAppNavigation = createStackNavigator();

const RootNavigator = () => (
    <NavigationContainer>
        <AllAppNavigation.Navigator {...setStackNavBarProperties()}>
            <AllAppNavigation.Screen name="MainScreenDrawer" component={DrawerNavigator} {...disableMainStackNavBar()} />
            <AllAppNavigation.Screen name="SwipeScreen" component={SwipeTabs} {...setBackArrowProperties("Home")} />
            <AllAppNavigation.Screen name="ConversationScreen" component={ConversationScreen} {...setBackArrowProperties("Matches")} />
        </AllAppNavigation.Navigator>
    </NavigationContainer>
);
export default RootNavigator;

function SwipeTabs() {
    return <SwipeScreenTabNavigator/>;
}
