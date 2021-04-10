import { ADD_MATCH, RESET_MATCHES } from "../actions/actions";

const initialState = {
  matches: {},
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATCH:
      let currentGroupMatches = state.matches[action.payload.groupId];
      if (!currentGroupMatches) {
        currentGroupMatches = [];
        return {
          ...state,
          matches: {
            ...state.matches,
            [action.payload.groupId]: [action.payload.userProfile],
          },
        };
      }
      if (currentGroupMatches.some((e) => e.id === action.payload.userProfile.id)) {
        return state;
      }
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.groupId]: [...currentGroupMatches, action.payload.userProfile],
        },
      };
    case RESET_MATCHES:
      return {
        ...state,
        matches: {},
      };
    default:
      return state;
  }
};

export default matchesReducer;
