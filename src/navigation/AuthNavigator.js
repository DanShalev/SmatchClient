import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { setHomeScreenHeaders } from "./utils/ScreensHeaders";
import { connect } from "react-redux";
import DrawerNavigator from "./DrawerNavigator";
import WelcomeScreen from "../screens/WelcomeScreen";
import { NavigationContainer } from "@react-navigation/native";

const StackNavigator = createStackNavigator();

function AuthStackNavigator({ loggedIn }) {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{
        headerShown: false
      }}>
        {loggedIn ? (
          <StackNavigator.Screen name="HomeScreen" component={DrawerNavigator} {...setHomeScreenHeaders()} />
        ) : (
          <StackNavigator.Screen name="WelcomeScreen" component={WelcomeScreen} {...setHomeScreenHeaders()} />
        )}
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  loggedIn: state.authentication.loggedIn,
});
export default connect(mapStateToProps, {})(AuthStackNavigator);
