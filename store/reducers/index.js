import { combineReducers } from 'redux';
import modals from './modals';
import appSettings from './appSettings';

export default combineReducers({
  modals,
  appSettings,
});
