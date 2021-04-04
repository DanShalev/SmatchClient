import {
  ADD_GROUP,
  UPDATE_CURRENT_GROUP_ID,
  RESET_GROUPS,
} from "../actions/actions";

const initialState = {
  currentGroupId: null, // Id of group being viewed (while in match/swipe screens)
  groups: {},
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.currentGroupId]: { ...action.payload },
        },
      };
    case UPDATE_CURRENT_GROUP_ID:
      return {
        ...state,
        currentGroupId: action.payload,
      };
    case RESET_GROUPS:
      return initialState;
    default:
      return state;
  }
};

export default groupsReducer;
