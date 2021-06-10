import {
  ADD_MATCH,
  SET_LOGIN_TOKEN,
  UPDATE_CURRENT_GROUP_ID,
  REMOVE_FIRST_PROFILE,
  DELETE_GROUP,
  UPDATE_CURRENT_CONVERSATION_ID,
  ADD_MESSAGE,
  UPDATE_MATCHES,
  UPDATE_PROFILES,
  UPDATE_GROUPS,
  RESET_SMATCH_BADGE,
  DELETE_MATCHES_BY_GROUP_ID,
  DELETE_MATCH, LOG_IN
} from "./actions";


export function addMatch(match) {
  return {
    type: ADD_MATCH,
    match: match,
  };
}

export function deleteMatch(otherUserId) {
  return {
    type: DELETE_MATCH,
    otherUserId: otherUserId,
  };
}

export function setUserId(userId) {
  return {
    type: SET_LOGIN_TOKEN,
    payload: userId,
  };
}

export function updateGroups(groups) {
  return {
    type: UPDATE_GROUPS,
    groups: groups,
  };
}

export function deleteGroup(groupId) {
  return {
    type: DELETE_GROUP,
    groupId: groupId,
  };
}

export function deleteMatchesByGroupId(groupId) {
  return {
    type: DELETE_MATCHES_BY_GROUP_ID,
    groupId: groupId,
  };
}


export function updateProfiles(profiles) {
  return {
    type: UPDATE_PROFILES,
    profiles: profiles,
  };
}

export function updateMatches(matches) {
  return {
    type: UPDATE_MATCHES,
    matches: matches,
  };
}

export function updateCurrentGroupId(groupId) {
  return {
    type: UPDATE_CURRENT_GROUP_ID,
    payload: groupId,
  };
}

export function removeFirstProfile(currentGroupId) {
  return {
    type: REMOVE_FIRST_PROFILE,
    currentGroupId: currentGroupId,
  };
}

export function updateCurrentConversationId(matchedUser, groupId) {
  return {
    type: UPDATE_CURRENT_CONVERSATION_ID,
    payload: { user: matchedUser, group: groupId },
  };
}

export function addMessage(groupId, otherUserId, msg) {
  return {
    type: ADD_MESSAGE,
    payload: { groupId: groupId, otherUserId: otherUserId, message: msg },
  };
}

export function resetSmatchBadge(matchId) {
  return {
    type: RESET_SMATCH_BADGE,
    matchId: matchId,
  };
}

export function updateAuthLogIn() {
  return {
    type: LOG_IN
  };
}
