import {persistReducer} from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux'

import modalVisibleReducer from "./ModalVisible";
import profilePictureIndexReducer from "./ProfilePictureIndex";


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  modalVisible: modalVisibleReducer,
  profilePictureIndex: profilePictureIndexReducer
})

export default persistReducer(persistConfig, rootReducer);