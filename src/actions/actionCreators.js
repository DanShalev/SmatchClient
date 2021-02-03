import {MODAL_VISIBLE, PROFILE_INDEX} from "./actions";

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
