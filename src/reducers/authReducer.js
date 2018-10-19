import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isSignIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.USER_SIGN_IN:
      return {
        ...state,
        isSignIn: true
      }

    default:
      return state;
  }
}