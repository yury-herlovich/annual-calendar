import { apiGetEvents } from '../api/calendarAPI';
import * as actionTypes from '../constants/actionTypes';

export function createCalendar(year) {
  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, 11, 31, 0, 0, 0));

  return (dispatch) => {
    dispatch({ type: actionTypes.SET_YEAR, year });
    dispatch(getEvents(startDate, endDate));
  }
}

export function getEvents(startDate, endDate) {
  return (dispatch) => {
    apiGetEvents(startDate, endDate)
      .then(res => {
        console.log(res);
        // dispatch({ type: actionTypes.SET_YEAR, year });
      }).catch(err => console.log(err));
  }
}