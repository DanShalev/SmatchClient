import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

import authReducer from "./AuthReducer";
import conversationsReducer from "./ConversationsReducer";
import mainReducer from "./MainReducer";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  authentication: authReducer,
  mainReducer: mainReducer,
  conversations: conversationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
