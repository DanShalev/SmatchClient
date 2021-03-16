import {
  ADD_MATCH,
  ADD_GROUP,
  DELETE_MATCH,
  MODAL_VISIBLE,
  PROFILE_INDEX,
  RESET_GROUPS_INFO,
  SET_LOGIN_TOKEN,
  UPDATE_CURRENT_GROUP_ID, REMOVE_FIRST_PROFILE, ADD_PROFILE,
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

export function addGroup(groupId, name, avatarUrl, numberOfMembers, fields) {
  return {
    type: ADD_GROUP,
    payload: {
      currentGroupId: groupId,
      name,
      avatarUrl,
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

export function addProfile(id, name, age, sex, imageUrl) {
  return {
    type: ADD_PROFILE,
    payload: {
      id,
      name,
      lastSeen: "last seen 5 minutes ago",
      newMessages: 0,
      newSmatch: false,
      fields: {
        0: { title: "Age", value: age },
        1: { title: "Sex", value: sex },
      },
      pictures: [imageUrl],
    },
  };
}

export function removeFirstProfile() {
  return {
    type: REMOVE_FIRST_PROFILE,
  };
}

export function resetGroupsInfo() {
  return {
    type: RESET_GROUPS_INFO,
  };
}
