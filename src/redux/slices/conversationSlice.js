import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    conversationsMapByGroupAndUser: {
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
    },
    currentConversation: { user: null, group: null, isTyping: false },
  },
  reducers: {
    addMessage(state, action) {
      const {groupId, otherUserId, message} = action.payload;
      if (groupId in state.conversationsMapByGroupAndUser) {
        if (otherUserId in state.conversationsMapByGroupAndUser[groupId]) {
          state.conversationsMapByGroupAndUser[groupId][otherUserId] = [...state.conversationsMapByGroupAndUser[groupId][otherUserId], ...message]
        } else {
          state.conversationsMapByGroupAndUser[groupId][otherUserId] = [...message]
        }
      } else {
        state.conversationsMapByGroupAndUser[groupId] = {
          [otherUserId]: [...message]
        }
      }
    },

    updateCurrentConversationId(state, action) {
      state.currentConversation = {
        user: action.payload.user,
        group: action.payload.group,
        isTyping: false
      };
    },

    updateCurrentConversationIsTyping(state, action) {
      state.currentConversation.isTyping = action.payload.isTyping;
    }
  }
});

export const { updateCurrentConversationIsTyping, updateCurrentConversationId, addMessage } = conversationSlice.actions;
export const selectCurrentConversation = state => state.conversation.currentConversation;
export const selectConversationMapping = state => state.conversation.conversationsMapByGroupAndUser;
export default conversationSlice.reducer;
