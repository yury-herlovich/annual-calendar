import * as actionTypes from '../constants/actionTypes';

const initialState = {
  year: null
}

export default (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_YEAR:
      return {
        ...state,
        year: action.year
      };
    default:
      return state;
  }
}