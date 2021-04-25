import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

import matchesReducer from "./MatchesReducer";
import groupsReducer from "./GroupsReducer";
import authReducer from "./AuthReducer";
import conversationsReducer from "./ConversationsReducer";
import profilesReducer from "./ProfilesReducer";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  authentication: authReducer,
  groups: groupsReducer,
  matches: matchesReducer,
  profiles: profilesReducer,
  conversations: conversationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
