import {persistReducer} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux'

import modalVisibleReducer from "./ModalVisible";
import profilePictureIndexReducer from "./ProfilePictureIndex";
import matches from "./Matches";
import userSubscriptionsReducer from "./UserSubscriptionsReducer";
import authReducer from "./AuthReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  authentication: authReducer,
  subscriptions: userSubscriptionsReducer,

  modalVisible: modalVisibleReducer,
  profilePictureIndex: profilePictureIndexReducer,
  matches: matches,
})

export default persistReducer(persistConfig, rootReducer);
