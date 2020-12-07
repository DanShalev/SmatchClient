import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SideMenu from "./src/screenUtils/SideMenu";
import NavBarProperties from "./src/screenUtils/NavBar";

const ReactNative = require("react-native");
try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={(navigation) => NavBarProperties(navigation)}
      >
        <Stack.Screen name='Home' component={SideMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
