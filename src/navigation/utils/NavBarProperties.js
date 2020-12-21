import {Platform} from "react-native";
import colors from "../../config/colors";
import SmatchLogoHeader from "./SmatchLogoHeader";
import SideMenuHeader from "./SideMenuHeader";
import React from "react";
import BackArrowHeader from "./BackArrowHeader";
import Ionicons from "react-native-vector-icons/Ionicons";

export function navBarProperties() {
    return {
        headerShown: true,
        headerTitle: null,
        gestureEnabled: true,
        headerStatusBarHeight: Platform === "android" ? 25 : 45,
        headerRightContainerStyle: {margin: 15},
        headerStyle: {
            backgroundColor: colors.primary,
        }
    };
}

export function setDrawerNavBarProperties() {
    return {
        drawerPosition: "right",
        screenOptions: () => {
            return {
                ...navBarProperties(),
                headerLeft: () => <SmatchLogoHeader/>,
                headerRight: () => <SideMenuHeader/>,
            }
        },
    };
}

export function setStackNavBarProperties() {
    return {
        screenOptions: () => {
            return {
                ...navBarProperties(),
                headerLeft: () => <SmatchLogoHeader/>,
            }
        },
    };
}

export function setBackArrowProperties(navigateLocation) {
    return {
        options: {
            headerLeft: () => <SmatchLogoHeader />,
            headerRight: () => <BackArrowHeader navigateLocation={navigateLocation} />,
        }
    };
}

export function disableMainStackNavBar() {
    return {
        options: {
            headerShown: false
        }
    };
}

export function setTabNavigationProperties() {
    return {
        tabBarOptions: {
            activeTintColor: colors.secondary,
            inactiveTintColor: colors.primary,
        },
        screenOptions: ({route}) => {
            return ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === "Groups") {
                        iconName = "ios-people";
                    } else if (route.name === "Browse") {
                        iconName = "ios-search";
                    } else if (route.name === "Swipe") {
                        iconName = "ios-infinite";
                    } else if (route.name === "Matches") {
                        iconName = "ios-chatbubbles";
                    }
                        return <Ionicons name={iconName} size={size} color={color} />;
                },
            });
        }
    };
}
