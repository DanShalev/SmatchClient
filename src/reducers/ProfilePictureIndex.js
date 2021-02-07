import {PROFILE_INDEX} from "../actions/actions";

const initialState = {
  profilePictureIndex: 0,
};


export default function profilePictureIndex(state = initialState, action) {
  switch (action.type) {
    case PROFILE_INDEX:
      return {
        ...state,
        profilePictureIndex: action.payload
      };
    default:
      return state;
  }
}