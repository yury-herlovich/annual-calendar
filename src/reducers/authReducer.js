import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  isSignIn: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.USER_SIGN_IN:
      return {
        ...state,
        isSignIn: true
      }

    case actionTypes.USER_SIGN_OUT:
      return {
        ...state,
        isSignIn: false
      }

    default:
      return state;
  }
}