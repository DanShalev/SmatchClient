import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {setHomeScreenHeaders} from "./utils/ScreensHeaders";
import { useSelector } from "react-redux";
import DrawerNavigator from "./DrawerNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import * as Linking from 'expo-linking';
import { selectIsAuthenticated } from "../redux/slices/authSlice";

const StackNavigator = createStackNavigator();
const prefix = Linking.createURL('/')

export default function AuthStackNavigator() {
  const loggedIn = useSelector(selectIsAuthenticated);

  const config = {
    screens: {
      DrawerHomeScreen: {
        screens: {
          JoinGroup: {
            path: 'join/:groupId',
          }
        }
      }
    }
  }

  const linking = {
    prefixes: [prefix],
    config,
  }

  return (
    <NavigationContainer linking={linking}>
      <StackNavigator.Navigator screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <StackNavigator.Screen name="DrawerHomeScreen" component={DrawerNavigator} {...setHomeScreenHeaders()} />
        ) : (
          <StackNavigator.Screen name="WelcomeScreen" component={WelcomeScreen} {...setHomeScreenHeaders()} />
        )}
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
