import {PROFILE_INDEX} from "../actions/actions";

const initialState = {
  profilePictureIndex: 0,
};

const setProfilePicIndex = (state, action) => {
  return Object.assign({}, state, {profilePictureIndex: action.payload});
}

export default function profilePictureIndex(state = initialState, action) {
  switch (action.type) {
    case PROFILE_INDEX:
      return setProfilePicIndex(state, action)
    default:
      return state;
  }
}