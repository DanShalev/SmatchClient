import { LOG_IN, LOG_OUT } from "../actions/actions";
import { loggedInUserMockData } from "../../../mocks/LoggedInUserMockData";

const initialState = {
  id: loggedInUserMockData.id,
  authCredentials: {
    isCurrentlyAuthenticated: false, // Updating this will cause AuthNavigator to re-render, and display different pages
    facebook_id: null
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        authCredentials: {
          isCurrentlyAuthenticated: true,
          facebook_id: action.payload.id
        }
      };
    case LOG_OUT:
      return {
        ...state,
        authCredentials: {
          isCurrentlyAuthenticated: false,
          facebook_id: null
        }
      };
    default:
      return state;
  }
};

export default authReducer;
