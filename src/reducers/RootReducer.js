import {persistReducer} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux'

import modalVisibleReducer from "./ModalVisible";
import profilePictureIndexReducer from "./ProfilePictureIndex";
import matches from "./Matches";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  modalVisible: modalVisibleReducer,
  profilePictureIndex: profilePictureIndexReducer,
  matches: matches
})

export default persistReducer(persistConfig, rootReducer);