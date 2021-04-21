import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";

import modalVisibleReducer from "./ModalVisible";
import profilePictureIndexReducer from "./ProfilePictureIndex";
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
  modalVisible: modalVisibleReducer,
  profilePictureIndex: profilePictureIndexReducer,
  matches: matchesReducer,
  profiles: profilesReducer,
  conversations: conversationsReducer,
});

export default persistReducer(persistConfig, rootReducer);
