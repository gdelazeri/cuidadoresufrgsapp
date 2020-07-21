import { modals } from '../actions/types';

const initialState = {
  loading: false,
  modalConfirm: {},
};

const setLoader = (state, payload) => ({
  ...state,
  loading: payload,
});

const setModalConfirm = (state, payload) => ({
  ...state,
  modalConfirm: payload,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case modals.SET_LOADING:
      return setLoader(state, action.payload);
    case modals.SET_MODAL_CONFIRM:
      return setModalConfirm(state, action.payload);
    default:
      return state;
  }
};
