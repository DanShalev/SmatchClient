import {
  ADD_GROUP,
  UPDATE_CURRENT_GROUP_ID,
  RESET_GROUPS_INFO, ADD_PROFILE, REMOVE_FIRST_PROFILE,
} from "../actions/actions";

const initialState = {
  currentGroupId: null, // Id of grouped being viewed (while in match/swipe screens)
  groups: {},
  groupsProfiles: {},
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
    case RESET_GROUPS_INFO:
      return initialState;
    case ADD_PROFILE:
      if (!state.groupsProfiles[state.currentGroupId]) {
        state.groupsProfiles[state.currentGroupId] = [];
      }
      let currentGroupProfiles = state.groupsProfiles[state.currentGroupId];
      if (!currentGroupProfiles.some((e) => e.id === action.payload.id)) {
        currentGroupProfiles = [...currentGroupProfiles, action.payload];
        return {
          ...state,
          groupsProfiles: {
            ...state.groupsProfiles,
            [state.currentGroupId]: [...currentGroupProfiles],
          },
        };
      } else {
        return state;
      }
    case REMOVE_FIRST_PROFILE:
      return {
        ...state,
        groupsProfiles: {
          ...state.groupsProfiles,
          [state.currentGroupId]: state.groupsProfiles[state.currentGroupId].slice(1),
        },
      };
    default:
      return state;
  }
};

export default groupsReducer;
