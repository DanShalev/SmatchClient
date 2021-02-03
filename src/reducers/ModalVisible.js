import {MODAL_VISIBLE} from "../actions/actions";

const initialState = {
  modalVisible: false,
};

const setModalVisible = (state, action) => {
  return Object.assign({}, state, {modalVisible: action.payload});
}

const modalVisible = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_VISIBLE:
      return setModalVisible(state, action)
    default:
      return state;
  }
}

export default modalVisible;