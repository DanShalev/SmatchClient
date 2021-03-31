import {ADD_MATCH, RESET_MATCHES} from "../actions/actions";

const initialState = {
  matches: {},
};

const matchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATCH:
      let currentGroup = state.matches[action.payload.groupId];
      if (!currentGroup) {
        currentGroup = []
        return {
          ...state,
          matches: {
            ...state.matches,
            [action.payload.groupId]: [action.payload.userProfile]
          }
        }
      }
      if (currentGroup.some((e) => e.id === action.payload.userProfile.id)) {
        return state;
      }
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.groupId]: [...currentGroup, action.payload.userProfile]
        }
      }
    case RESET_MATCHES:
      return {
        ...state,
        matches: {}
      }
    default:
      return state;
  }
}

export default matchesReducer;