import {MODAL_VISIBLE} from "../actions/actions";

const initialState = {
  modalVisible: false,
};

const modalVisible = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: action.payload
      };
    default:
      return state;
  }
}

export default modalVisible;