import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import reducer from "../reducers/RootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import consts from "../../config/consts";

export const store = createStore(reducer, applyMiddleware(thunk));

if (consts.FLAGS.RESET_STORAGE) {
  AsyncStorage.clear();
}

store.subscribe(() => {
  // console.log("Printing REDUX store (for debugging):");
  // console.log(store.getState().authentication);
});

export const persistor = persistStore(store);

export default { store, persistor };
