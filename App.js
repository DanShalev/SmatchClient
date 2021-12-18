import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/Store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import "./src/config/disableWarnings";
import "./src/redux/debug/debugPrints";
import { useFonts, Assistant_700Bold, Assistant_600SemiBold, Assistant_400Regular, Assistant_300Light } from "@expo-google-fonts/assistant";
import AppLoading from "expo-app-loading";

const ReactNative = require("react-native");
try {
  ReactNative.I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

function App() {
  let [fontsLoaded] = useFonts({
    Assistant_700Bold,
    Assistant_600SemiBold,
    Assistant_400Regular,
    Assistant_300Light
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
