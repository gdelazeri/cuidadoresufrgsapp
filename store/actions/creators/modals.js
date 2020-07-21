import { modals } from '../types';

export const setLoader = (payload) => ({
  type: modals.SET_LOADING,
  payload,
});

export const setModalConfirm = (payload) => ({
  type: modals.SET_MODAL_CONFIRM,
  payload,
});
