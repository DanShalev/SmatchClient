import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {setHomeScreenHeaders} from "./utils/ScreensHeaders";
import {connect} from "react-redux";
import DrawerNavigator from "./DrawerNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import * as Linking from 'expo-linking';
import {Alert} from "react-native";

const StackNavigator = createStackNavigator();
const prefix = Linking.createURL('/')

function AuthStackNavigator({loggedIn}) {

  const config = {
    screens: {
      DrawerHomeScreen: {
        screens: {
          GroupDetails: {
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

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.authCredentials.isCurrentlyAuthenticated,
});
export default connect(mapStateToProps, {})(AuthStackNavigator);
