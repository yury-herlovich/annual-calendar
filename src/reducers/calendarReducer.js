import * as actionTypes from '../constants/actionTypes';

const initialState = {
  year: null,
  events: []
}

export default (state=initialState, action) => {
  switch (action.type) {

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

    case actionTypes.ADD_EVENTS:
      return {
        ...state,
        events: state.events.concat(action.events)
      };

    default:
      return state;
  }
}