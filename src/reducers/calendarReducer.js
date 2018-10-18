import * as actionTypes from '../constants/actionTypes';

const initialState = {
  year: null,
  events: [],
  isLoading: false
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

    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }

    default:
      return state;
  }
}