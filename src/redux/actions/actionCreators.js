import {
  ADD_MATCH,
  ADD_USER_SUBSCRIPTION,
  DELETE_MATCH,
  MODAL_VISIBLE,
  PROFILE_INDEX,
  SET_LOGIN_TOKEN,
  UPDATE_CURRENT_VIEWED_SUBSCRIPTION,
} from "./actions";

export function setModalVisible(modalVisible) {
  return {
    type: MODAL_VISIBLE,
    payload: modalVisible,
  };
}

export function setProfileIndex(profilePictureIndex) {
  return {
    type: PROFILE_INDEX,
    payload: profilePictureIndex,
  };
}

export function addMatch(matchId, groupId, matchUserId) {
  return {
    type: ADD_MATCH,
    payload: {
      matchId,
      groupId,
      matchUserId,
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

export function addUserSubscription(subscriptionId, name, avatarUrl, numberOfMembers, fields) {
  return {
    type: ADD_USER_SUBSCRIPTION,
    payload: {
      subscriptionId,
      name,
      avatarUrl,
      numberOfMembers,
      fields,
      newSmatches: 0,
      newMessages: 0,
    },
  };
}
export function updateCurrentViewedSubscription(groupId) {
  return {
    type: UPDATE_CURRENT_VIEWED_SUBSCRIPTION,
    payload: groupId,
  };
}
