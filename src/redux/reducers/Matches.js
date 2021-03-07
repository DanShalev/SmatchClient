import {ADD_MATCH, DELETE_MATCH} from "../actions/actions";

const initialState = {
  matches: {}
};

const matches = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATCH:
      return {
        ...state,
        matches: {
          ...state.matches,
          [action.payload.matchId]: {...action.payload}
        }
      }
    case DELETE_MATCH:
      const {[action.payload]: omit, ...restOfMatches} = state.matches;
      return {
        ...state,
        matches: restOfMatches
      }
    default:
      return state;
  }
}

export default matches;