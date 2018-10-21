import { apiGetEvents } from '../api/calendarAPI';
import { loadGoogleClient } from '../api/googleAuthAPI';
import * as actionTypes from '../constants/actionTypes';

export function loadGoogleAPI() {
  return (dispatch) => {
    loadGoogleClient()
      .then(() => {
        dispatch({ type: actionTypes.GOOGLE_CLIENT_LOADED });
      });
  }
}

export function setYear(year) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_YEAR, year });
    dispatch({ type: actionTypes.CLEAR_EVENTS });
  }
}

export function getEvents(year) {
  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, 11, 31, 0, 0, 0));

  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    apiGetEvents(startDate, endDate)
      .then(res => {
        dispatch({ type: actionTypes.ADD_EVENTS, events: res.result.items });
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      }).catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      });
  }
}