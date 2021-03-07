import * as React from "react";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react'

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import {store, persistor} from "./src/redux/store/Store";

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
        <DrawerNavigator/>
      </PersistGate>
    </Provider>
  )
}

export default App;
