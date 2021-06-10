import { LOG_IN, SET_LOGIN_TOKEN } from "../actions/actions";
import { loggedInUserMockData } from "../../../mocks/LoggedInUserMockData";

const initialState = {
  id: loggedInUserMockData.id,
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return {
        ...state,
        id: [action.payload.id],
      };
    case LOG_IN:
      return {
        ...state,
        loggedIn: true
      };
    default:
      return state;
  }
};

export default authReducer;
