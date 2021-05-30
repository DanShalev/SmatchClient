import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import mainReducer from "./MainReducer";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  authentication: authReducer,
  mainReducer: mainReducer,
});

export default persistReducer(persistConfig, rootReducer);
