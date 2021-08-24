import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    matches: {},
  },
  reducers: {
    updateMatches(state, action) {
      // Add matches by server comparison
      for (let [groupId, matchesList] of Object.entries(action.payload.matches)) {
        state.matches[groupId] = state.matches[groupId] || [];
        for (let match of matchesList) {
          if (!state.matches[groupId].some((currMatch) => currMatch.id === match.id)) {
            state.matches[groupId].push({
              id: match.id,
              name: match.name,
              sex: match.sex,
              age: match.age,
              pushNotificationToken: match.pushNotificationToken,
              pictures: [match.image1, match.image2, match.image3],
              newSmatch: true,
              newMessages: 0,
            });
          }
        }
      }

      // Delete matches by server comparison
      for (let [groupId, matchesList] of Object.entries(state.matches)) {
        for (let match of matchesList) {
          if (!action.payload.matches[groupId].some((currMatch) => currMatch.id === match.id)) {
            state.matches[groupId] = state.matches[groupId].filter((currMatch) => currMatch.id !== match.id);
          }
        }
      }
    },

    deleteMatch(state, action) {
      let groupMatches = state.matches[action.payload.currentGroupId];
      groupMatches = groupMatches.filter((match) => match.id !== action.payload.otherUserId);
      state.matches[action.payload.currentGroupId] = groupMatches;
    },

    deleteMatchesByGroupId(state, action) {
      delete state.matches[action.payload.groupId];
    },

    addMatch(state, action) {
      let currentGroupMatches = state.matches[action.payload.currentGroupId] || [];
      if (currentGroupMatches.some((user) => user.id === action.payload.match.id)) {
        return;
      }

      state.matches[action.payload.currentGroupId] = [
        ...currentGroupMatches,
        {
          id: action.payload.match.id,
          name: action.payload.match.name,
          sex: action.payload.match.sex,
          age: action.payload.match.age,
          pushNotificationToken: action.payload.match.pushNotificationToken,
          pictures: action.payload.match.pictures,
          newSmatch: true,
          newMessages: 0,
        }
      ]
    },

    addToMatchMessageBadge(state, action) {
      const {groupId, otherUserId} = action.payload;

      if (!(groupId in state.matches)) {
        return;
      }

      let matchIndex = state.matches[groupId].findIndex((match) => match.id === otherUserId);
      state.matches[groupId][matchIndex].newMessages += 1;
    },

    resetMatchBadges(state, action) {
      const {groupId, matchId} = action.payload;
      let matchIndex = state.matches[groupId].findIndex((match) => match.id === matchId);

      state.matches[groupId][matchIndex].newSmatch = false;
      state.matches[groupId][matchIndex].newMessages = 0;
    },
  }
});

export const {
  updateMatches,
  deleteMatch,
  deleteMatchesByGroupId,
  addMatch,
  resetMatchBadges,
  addToMatchMessageBadge
} = matchesSlice.actions;
export const selectMatches = state => state.matches.matches;
export default matchesSlice.reducer;
