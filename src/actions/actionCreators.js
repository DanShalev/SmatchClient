import {ADD_MATCH, DELETE_MATCH, MODAL_VISIBLE, PROFILE_INDEX} from "./actions";

export function setModalVisible(modalVisible) {
  return {
    type: MODAL_VISIBLE,
    payload: modalVisible,
  }
}

export function setProfileIndex(profilePictureIndex) {
  return {
    type: PROFILE_INDEX,
    payload: profilePictureIndex,
  }
}

export function addMatch(matchId, groupId, matchUserId) {
  return {
    type: ADD_MATCH,
    payload: {
      matchId,
      groupId,
      matchUserId
    }
  }
}

export function deleteMatch(matchId) {
  return {
    type: DELETE_MATCH,
    payload: matchId,
  }
}
