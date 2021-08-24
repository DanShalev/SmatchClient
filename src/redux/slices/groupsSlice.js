import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const groupsSlice = createSlice({
   name: "groups",
   initialState: {
     groups: {},
     currentGroupId: null, // Id of group being viewed (while in match/swipe screens)
   },
    reducers: {
      updateCurrentGroupId(state, action) {
        state.currentGroupId = action.payload;
      },

      updateGroups(state, action) {
        // Add groups by server comparison
        for (let group of action.payload.groups) {
          if (!state.groups[group.id]) {
            state.groups[group.id] = {
              id: group.id,
              name: group.name,
              description: group.description,
              numberOfMembers: group.numberOfMembers,
              avatar: group.avatar,
              fields: group.fields,
              newSmatches: 0,
              newMessages: 0,
            };
          }
        }

        // Delete groups by server comparison
        for (let [existingGroupId] of Object.entries(state.groups)) {
          if (!action.payload.groups.some((group) => group.id === existingGroupId)) {
            delete state.groups[existingGroupId];
          }
        }
      },

      deleteGroup(state, action) {
        delete state.groups[action.payload.groupId];
      },

      addToGroupSmatchBadge(state, action) {
        if (!(action.payload.groupId in state.groups)) {
          return;
        }

        state.groups[action.payload.groupId].newSmatches += 1;
      },

      addToGroupMessageBadge(state, action) {
        if (!(action.payload.groupId in state.groups)) {
          return;
        }
        state.groups[action.payload.groupId].newMessages += 1;
      },

      reduceGroupBadges(state, action) {
        const {groupId, matchId, oldMatches} = action.payload;

        let currentMatches = oldMatches[groupId];
        let matchIndex = currentMatches.findIndex((match) => match.id === matchId);

        if (currentMatches[matchIndex].newSmatch) {
          state.groups[groupId].newSmatches -= 1;
        }
        state.groups[groupId].newMessages -= currentMatches[matchIndex].newMessages;
      },
    }
});

export const {
  updateCurrentGroupId,
  updateGroups,
  deleteGroup,
  reduceGroupBadges,
  addToGroupMessageBadge,
  addToGroupSmatchBadge
} = groupsSlice.actions;
export const selectGroups = state => state.groups.groups;
export const selectCurrentGroupId = state => state.groups.currentGroupId;
export default groupsSlice.reducer;
