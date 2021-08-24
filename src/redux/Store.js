import { configureStore } from "@reduxjs/toolkit";
import consts from "../config/consts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rootReducer from "./slices/rootReducer";

if (consts.FLAGS.RESET_STORAGE) {
  AsyncStorage.clear();
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  /* Redux-persist integration with redux-toolkit,
  *  as suggested at the official docs: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  * */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:
        /* 1. Default behavior needed for redux-persist:
        * {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
        * 2. For no-serialization use: false
        *    Needed because conversation messages (under conversations.conversationsMapByGroupAndUser) date
        *    is an object and thus non-serializable.
        *  */
        false,
    }),
})
export const persistor = persistStore(store);

