import {createStore, applyMiddleware} from "redux";
import {persistStore} from 'redux-persist'
import thunk from 'redux-thunk';

import reducer from "../reducers/RootReducer";

export const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log("Printing REDUX store (for debugging):")
  console.log(store.getState())
})

export const persistor = persistStore(store)

export default {store, persistor}
