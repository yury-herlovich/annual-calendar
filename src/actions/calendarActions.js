import _ from 'lodash';
import { apiGetEvents, apiGetEvent, apiPatchEvent, apiAddEvent } from '../api/calendarAPI';
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
  }
}

export function getEvents(year) {
  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const endDate = new Date(Date.UTC(year, 11, 31, 0, 0, 0));

  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    apiGetEvents(startDate, endDate)
      .then(res => {
        let events = {};

        for (let event of res.result.items) {
          events[event.id] = _.pick(event, ['id', 'htmlLink', 'description', 'end', 'start', 'summary']);
        }

        dispatch({ type: actionTypes.SET_EVENTS, events });
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      }).catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      });
  }
}

export function getEvent(id) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    apiGetEvent(id)
      .then((res) => {
        let events = {
          [id]: res.result
        }

        dispatch({ type: actionTypes.SET_EVENTS, events });
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      }).catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      })
  }
}


export function updateEvent(id, eventData) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    apiPatchEvent(id, eventData)
      .then(res => {
        let events = {
          [id]: res.result
        }

        dispatch({ type: actionTypes.SET_EVENTS, events });
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      }).catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      });
  }
}


export function addEvent(eventData) {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_LOADING, isLoading: true });

    apiAddEvent(eventData)
      .then(res => {
        let events = {
          [res.result.id]: res.result
        }

        dispatch({ type: actionTypes.SET_EVENTS, events });
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      }).catch(err => {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, isLoading: false });
      });
  }
}
