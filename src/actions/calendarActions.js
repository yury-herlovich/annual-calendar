import { apiGetEvents } from '../api/calendarAPI';
import * as actionTypes from '../constants/actionTypes';

import { generateCalendar } from '../utils/utils';

export function createCalendar(year) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_YEAR, year });
    dispatch({ type: actionTypes.CLEAR_EVENTS });
    dispatch(getEvents(year));
  }
}

export function getEvents(year) {
  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, 11, 31, 0, 0, 0));

  return (dispatch) => {
    apiGetEvents(startDate, endDate)
      .then(res => {
        dispatch({ type: actionTypes.ADD_EVENTS, events: res.result.items });
      }).catch(err => console.log(err));
  }
}