import { apiGetEvents } from '../api/calendarAPI';
import * as actionTypes from '../constants/actionTypes';

export function createCalendar(year) {
  const startDate = year + '-01-01T00:00:00';
  const endDate = year + '-12-31T23:59:59';

  return (dispatch) => {
    dispatch({ type: actionTypes.SET_YEAR, year });
    dispatch(getEvents(year));
  }
}

export function getEvents(year) {
  return (dispatch) => {
    apiGetEvents()
      .then(res => {
        console.log(res);
        // dispatch({ type: actionTypes.SET_YEAR, year });
      }).catch(err => console.log(err));
  }
}