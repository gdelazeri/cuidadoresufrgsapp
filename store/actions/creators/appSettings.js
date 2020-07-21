import { appSettings } from '../types';

export const setUser = (payload) => ({
  type: appSettings.SET_USER,
  payload,
});
