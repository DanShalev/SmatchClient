import {
  ADD_MESSAGE,
  UPDATE_CURRENT_CONVERSATION_ID
} from "../actions/actions";

const initialState = {
  groups: {},
  currentConversationId: {user: null, group: null},
  /*
  * This reducer will hold an hash map of groups, and for each group it will hold an hash map for each user.
  * For each user, all messages will be saved there.
  * Example (user id 1, group 99):
  * groups: {
  *         99: {
  *             2: [{text: "hey there", sender: true}]
  *           }
  *       }
  * }
  * */
};

const conversationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const groupId = action.payload.groupId;
      const userId = action.payload.otherUserId;
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupId]: (groupId in state.groups) ? {
            ...state.groups[groupId],
            [userId]: (userId in state.groups[groupId]) ? [...state.groups[groupId][userId], ...action.payload.message] : [...action.payload.message]
          } : {
            [userId]: [...action.payload.message]
          },
        },
      };
    case UPDATE_CURRENT_CONVERSATION_ID:
      return {
        ...state,
        currentConversationId: action.payload,
      };
    default:
      return state;
  }
};

export default conversationsReducer;
