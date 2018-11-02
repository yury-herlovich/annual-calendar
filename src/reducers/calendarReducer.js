import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  year: null,
  events: [],
  eventPosById: {},
  isLoading: false,
  googleClientLoaded: false
}

export default (state = initialState, action) => {
  let events = [...state.events];
  let eventPosById = {...state.eventPosById};

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
        events: [],
        eventPosById: {}
      };

    case actionTypes.SET_EVENTS:
      action.events.forEach(event => {
        let eventPos = state.eventPosById[event.id];

        if (eventPos !== undefined) {
          events[eventPos] = event;
        } else {
          eventPosById[event.id] = events.length;
          events.push(event);
        }
      });

      return {
        ...state,
        events,
        eventPosById
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