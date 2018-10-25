import * as actionTypes from '../constants/actionTypes';

const initialState = {
  year: null,
  events: {},
  isLoading: false,
  googleClientLoaded: false
}

export default (state=initialState, action) => {
  switch (action.type) {

    case actionTypes.GOOGLE_CLIENT_LOADED:
      return {
        ...state,
        googleClientLoaded: true
      }

    case actionTypes.SET_YEAR:
      return {
        ...state,
        year: action.year
      };

    case actionTypes.CLEAR_EVENTS:
      return {
        ...state,
        events: []
      };

    case actionTypes.SET_EVENTS:
      let events = {...state.events};

      Object.keys(action.events).forEach((eventId) => {
        events[eventId] = action.events[eventId];
      })

      return {
        ...state,
        events
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }

    default:
      return state;
  }
}