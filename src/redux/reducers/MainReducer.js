import {
  ADD_MATCH,
  DELETE_GROUP,
  DELETE_MATCH,
  DELETE_MATCHES_BY_GROUP_ID,
  REMOVE_FIRST_PROFILE,
  RESET_SMATCH_BADGE,
  UPDATE_CURRENT_GROUP_ID,
  UPDATE_GROUPS,
  UPDATE_MATCHES,
  UPDATE_PROFILES,
  ADD_MESSAGE,
  UPDATE_CURRENT_CONVERSATION_ID,
  RESET_SMATCHES_AND_MESSAGES_BADGES,
  SET_CURRENT_USER_DATA
} from "../actions/actions";
import { appendImagePrefix, appendImagePrefixes } from "../actions/actionUtils";

const initialState = {
  currentGroupId: null, // Id of group being viewed (while in match/swipe screens)
  currentUserData: {},
  groups: {},
  profiles: {},
  matches: {},
  conversation: {
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
    conversationsMapByGroupAndUser: {},
    currentConversationId: { user: null, group: null },
  },
};

const mainReducer = (state = initialState, action) => {
  let currentGroups;
  let currentMatches;
  let matchIndex;
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
    case DELETE_GROUP:
      let { [action.groupId]: groupToDelete, ...restOfGroups } = state.groups;
      return {
        ...state,
        groups: restOfGroups,
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
    case DELETE_MATCH:
      let groupMatches = state.matches[state.currentGroupId];
      groupMatches = groupMatches.filter((match) => match.id !== action.otherUserId);
      return {
        ...state,
        matches: {
          ...state.matches,
          [state.currentGroupId]: groupMatches,
        },
      };
    case DELETE_MATCHES_BY_GROUP_ID:
      let { [action.groupId]: matchesToDelete, ...restOfMatches } = state.matches;
      return {
        ...state,
        matches: restOfMatches,
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
    case RESET_SMATCHES_AND_MESSAGES_BADGES:
      currentMatches = state.matches[state.currentGroupId];
      matchIndex = currentMatches.findIndex((match) => match.id === action.matchId);
      let matchMessages = currentMatches[matchIndex].newMessages;
      let groupNewSmatches = state.matches[state.currentGroupId][matchIndex].newSmatch
        ? state.groups[state.currentGroupId].newSmatches - 1
        : state.groups[state.currentGroupId].newSmatches;
      let groupNewMessages = state.groups[state.currentGroupId].newMessages - matchMessages;
      currentMatches[matchIndex].newSmatch = false;
      currentMatches[matchIndex].newMessages = 0;
      return {
        ...state,
        groups: {
          ...state.groups,
          [state.currentGroupId]: {
            ...state.groups[state.currentGroupId],
            newSmatches: groupNewSmatches,
            newMessages: groupNewMessages,
          },
        },
        matches: {
          ...state.matches,
          [state.currentGroupId]: currentMatches,
        },
      };
    case ADD_MESSAGE:
      const groupId = action.payload.groupId;
      const userId = action.payload.otherUserId;

      let newMessagesCount = action.payload.isSend
        ? state.groups[state.currentGroupId].newMessages
        : state.groups[state.currentGroupId].newMessages + 1;
      currentMatches = state.matches[state.currentGroupId];
      matchIndex = currentMatches.findIndex((match) => match.id === action.payload.otherUserId);
      currentMatches[matchIndex].newMessages = action.payload.isSend
        ? currentMatches[matchIndex].newMessages
        : currentMatches[matchIndex].newMessages + 1;

      return {
        ...state,
        groups: {
          ...state.groups,
          [state.currentGroupId]: {
            ...state.groups[state.currentGroupId],
            newMessages: newMessagesCount,
          },
        },
        matches: {
          ...state.matches,
          [state.currentGroupId]: currentMatches,
        },
        conversation: {
          ...state.conversation,
          conversationsMapByGroupAndUser: {
            ...state.conversation.conversationsMapByGroupAndUser,
            [groupId]:
              groupId in state.conversation.conversationsMapByGroupAndUser
                ? {
                    ...state.conversation.conversationsMapByGroupAndUser[groupId],
                    [userId]:
                      userId in state.conversation.conversationsMapByGroupAndUser[groupId]
                        ? [...state.conversation.conversationsMapByGroupAndUser[groupId][userId], ...action.payload.message]
                        : [...action.payload.message],
                  }
                : {
                    [userId]: [...action.payload.message],
                  },
          },
        },
      };
    case UPDATE_CURRENT_CONVERSATION_ID:
      return {
        ...state,
        conversation: {
          ...state.conversation,
          currentConversationId: action.payload,
        },
      };
    case SET_CURRENT_USER_DATA:
      return {
        ...state,
        currentUserData: {
          fb_token: action.payload.fb_token,
          id: action.payload.facebook_id,
          name: action.payload.name,
          age: action.payload.age,
          gender: action.payload.gender,
          picture: action.payload.picture,
        }
      };
    default:
      return state;
  }
};

export default mainReducer;
