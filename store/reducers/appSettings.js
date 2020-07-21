import { appSettings } from '../actions/types';

const initialState = {
  user: {
    id: undefined,
    email: '',
    name: '',
  },
};

const setUser = (state, payload) => ({
  ...state,
  user: payload,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case appSettings.SET_USER:
      return setUser(state, action.payload);
    default:
      return state;
  }
};
