import {
  ADD_MATCH,
  REMOVE_FIRST_PROFILE,
  RESET_SMATCH_BADGE,
  UPDATE_CURRENT_GROUP_ID,
  UPDATE_GROUPS,
  UPDATE_MATCHES,
  UPDATE_PROFILES,
} from "../actions/actions";
import { appendImagePrefix, appendImagePrefixes } from "../actions/actionUtils";

const initialState = {
  currentGroupId: null, // Id of group being viewed (while in match/swipe screens)
  groups: {},
  profiles: {},
  matches: {},
};

const mainReducer = (state = initialState, action) => {
  let currentGroups;
  let currentMatches;
  switch (action.type) {
    case UPDATE_GROUPS:
      currentGroups = { ...state.groups };
      // add groups by server comparison
      for (let group of action.groups) {
        if (!currentGroups[group.id]) {
          currentGroups[group.id] = {
            id: group.id,
            name: group.name,
            description: group.description,
            numberOfMembers: group.numberOfMembers,
            avatar: appendImagePrefix(group.avatar),
            fields: group.fields,
            newSmatches: 0,
            newMessages: 0,
          };
        }
      }
      // delete groups by server comparison
      for (let [existingGroupId] of Object.entries(currentGroups)) {
        if (!action.groups.some((group) => group.id === existingGroupId)) {
          delete currentGroups[existingGroupId];
        }
      }
      return {
        ...state,
        groups: currentGroups,
      };
    case UPDATE_CURRENT_GROUP_ID:
      return {
        ...state,
        currentGroupId: action.payload,
      };
    case UPDATE_PROFILES:
      let currentProfiles = {};
      for (let [groupId, profilesList] of Object.entries(action.profiles)) {
        currentProfiles[groupId] = [];
        for (let profile of profilesList) {
          currentProfiles[groupId].push({
            id: profile.id,
            name: profile.name,
            sex: profile.sex,
            age: profile.age,
            pushNotificationToken: profile.pushNotificationToken,
            pictures: appendImagePrefixes([profile.image1, profile.image2, profile.image3]),
          });
        }
      }
      return {
        ...state,
        profiles: currentProfiles,
      };
    case REMOVE_FIRST_PROFILE:
      return {
        ...state,
        profiles: {
          ...state.profiles,
          [action.currentGroupId]: state.profiles[action.currentGroupId].slice(1),
        },
      };
    case UPDATE_MATCHES:
      currentMatches = { ...state.matches };
      currentGroups = { ...state.groups };
      // add matches by server comparison
      for (let [groupId, matchesList] of Object.entries(action.matches)) {
        currentMatches[groupId] = currentMatches[groupId] || [];
        currentGroups[groupId].newSmatches = currentGroups[groupId].newSmatches || 0;
        for (let match of matchesList) {
          if (!currentMatches[groupId].some((currMatch) => currMatch.id === match.id)) {
            currentMatches[groupId].push({
              id: match.id,
              name: match.name,
              sex: match.sex,
              age: match.age,
              pushNotificationToken: match.pushNotificationToken,
              pictures: appendImagePrefixes([match.image1, match.image2, match.image3]),
              newSmatch: true,
              newMessages: 0,
            });
            currentGroups[groupId].newSmatches += 1;
          }
        }
      }
      // delete matches by server comparison
      for (let [groupId, matchesList] of Object.entries(currentMatches)) {
        for (let match of matchesList) {
          if (!action.matches[groupId].some((currMatch) => currMatch.id === match.id)) {
            currentMatches[groupId] = currentMatches[groupId].filter((currMatch) => currMatch.id !== match.id);
          }
        }
      }
      return {
        ...state,
        groups: currentGroups,
        matches: currentMatches,
      };
    case ADD_MATCH:
      let currentGroupMatches = state.matches[state.currentGroupId] || [];
      if (currentGroupMatches.some((user) => user.id === action.match.id)) {
        return state;
      }
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.currentGroupId]: {
            ...state.groups[state.currentGroupId],
            newSmatches: state.groups[state.currentGroupId].newSmatches + 1,
          },
        },
        matches: {
          ...state.matches,
          [state.currentGroupId]: [
            ...currentGroupMatches,
            {
              id: action.match.id,
              name: action.match.name,
              sex: action.match.sex,
              age: action.match.age,
              pushNotificationToken: action.match.pushNotificationToken,
              pictures: action.match.pictures,
              newSmatch: true,
              newMessages: 0,
            },
          ],
        },
      };
    case RESET_SMATCH_BADGE:
      currentMatches = state.matches[state.currentGroupId];
      let matchIndex = currentMatches.findIndex((match) => match.id === action.matchId);
      currentMatches[matchIndex].newSmatch = false;
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.currentGroupId]: {
            ...state.groups[state.currentGroupId],
            newSmatches: state.groups[state.currentGroupId].newSmatches - 1,
          },
        },
        matches: {
          ...state.matches,
          [state.currentGroupId]: currentMatches,
        },
      };
    default:
      return state;
  }
};

export default mainReducer;
