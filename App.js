import * as React from "react";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from "./src/redux/store/Store";
import AuthNavigator from "./src/navigation/AuthNavigator";

const ReactNative = require("react-native");
try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthNavigator/>
      </PersistGate>
    </Provider>
  )
}

export default App;
