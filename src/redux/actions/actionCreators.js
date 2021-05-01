import {
  ADD_MATCH,
  ADD_GROUP,
  DELETE_MATCH,
  RESET_GROUPS,
  SET_LOGIN_TOKEN,
  UPDATE_CURRENT_GROUP_ID, REMOVE_FIRST_PROFILE, ADD_PROFILE, RESET_MATCHES, UPDATE_CURRENT_CONVERSATION_ID, ADD_MESSAGE
} from "./actions";
import {appendImagePrefix, appendImagePrefixes} from "./actionUtils";

export function resetMatches() {
  return {
    type: RESET_MATCHES,
  };
}

export function addMatch(groupId, userProfile) {
  return {
    type: ADD_MATCH,
    payload: {
      groupId,
      userProfile
    },
  };
}

export function deleteMatch(matchId) {
  return {
    type: DELETE_MATCH,
    payload: matchId,
  };
}

export function setUserId(userId) {
  return {
    type: SET_LOGIN_TOKEN,
    payload: userId,
  };
}

export function addGroup(groupId, name, avatar, numberOfMembers, fields) {
  avatar = appendImagePrefix(avatar);
  return {
    type: ADD_GROUP,
    payload: {
      currentGroupId: groupId,
      name,
      avatar,
      numberOfMembers,
      fields,
      newSmatches: 0,
      newMessages: 0,
    },
  };
}

export function updateCurrentGroupId(groupId) {
  return {
    type: UPDATE_CURRENT_GROUP_ID,
    payload: groupId,
  };
}

export function addProfile(id, name, age, sex, image1, image2, image3, currentGroupId) {
  let images = appendImagePrefixes([image1, image2, image3])
  return {
    type: ADD_PROFILE,
    payload: {
      id,
      name,
      lastSeen: "last seen 5 minutes ago",
      newMessages: 0,
      newSmatch: false,
      fields: [
        {title: "Age", value: age},
        {title: "Sex", value: sex},
      ],
      pictures: [...images],
    },
    currentGroupId: currentGroupId
  };
}

export function removeFirstProfile(currentGroupId) {
  return {
    type: REMOVE_FIRST_PROFILE,
    currentGroupId: currentGroupId
  };
}

export function resetGroups() {
  return {
    type: RESET_GROUPS,
  };
}

export function updateCurrentConversationId(matchedUser, groupId) {
  return {
    type: UPDATE_CURRENT_CONVERSATION_ID,
    payload: {user: matchedUser, group: groupId},
  };
}

export function addMessage(groupId, otherUserId, msg) {
  return {
    type: ADD_MESSAGE,
    payload: {groupId: groupId, otherUserId: otherUserId, message: msg},
  };
}
