import {createStore, applyMiddleware} from "redux";
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk';

import reducer from "../src/reducers/RootReducer";

export const store = createStore(reducer, applyMiddleware(thunk));

//TODO only for testing purposes
store.subscribe(() => {
  console.log(store.getState())
})

export const persistor = persistStore(store)

export default {store, persistor}
