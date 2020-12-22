import * as React from "react";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

const ReactNative = require("react-native");
try {
    ReactNative.I18nManager.allowRTL(false);
} catch (e) {
    console.log(e);
}

function App() {
  return <DrawerNavigator />;
}

export default App;
