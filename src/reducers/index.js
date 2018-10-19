import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import authReducer from './authReducer';

export default combineReducers({
  calendar: calendarReducer,
  auth: authReducer
});