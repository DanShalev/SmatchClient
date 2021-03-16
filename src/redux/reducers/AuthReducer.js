import { SET_LOGIN_TOKEN } from "../actions/actions";
import { loggedInUserMockData } from "../../../mocks/LoggedInUserMockData";

const initialState = {
  id: loggedInUserMockData.id,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_TOKEN:
      return {
        ...state,
        id: [action.payload.id],
      };
    default:
      return state;
  }
};

export default authReducer;
