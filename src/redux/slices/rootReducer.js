import {combineReducers} from "redux";
import authSlice from "./authSlice";
import groupsSlice from "./groupsSlice";
import profilesSlice from "./profilesSlice";
import matchesSlice from "./matchesSlice";
import conversationSlice from "./conversationSlice";
import browseSlice from "./browseSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  groups: groupsSlice,
  profiles: profilesSlice,
  matches: matchesSlice,
  conversation: conversationSlice,
  browse: browseSlice,
});

export default rootReducer;
