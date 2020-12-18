import * as React from "react";
import RootNavigator from "./src/navigation/RootNavigator";

const ReactNative = require("react-native");
try {
    ReactNative.I18nManager.allowRTL(false);
} catch (e) {
    console.log(e);
}

function App() {
    return (
        <RootNavigator/>
    );
}

export default App;
