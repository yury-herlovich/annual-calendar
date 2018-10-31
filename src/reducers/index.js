import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import authReducer from './authReducer';
import modalReducer from './modalReducer';

export default combineReducers({
  calendar: calendarReducer,
  auth: authReducer,
  modal: modalReducer
});