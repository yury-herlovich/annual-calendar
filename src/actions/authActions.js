import * as actionTypes from '../constants/actionTypes';
import { userIsSignIn, googleSignOut } from '../api/googleAuthAPI';

export function signIn() {
  return (dispatch) => {
    return userIsSignIn(true).then(() => {
      dispatch(setSignIn());
    });
  }
}

export function signOut() {
  return (dispatch) => {
    return googleSignOut().then(() => {
      dispatch(setSignOut());
    });
  }
}

export const setSignIn = () => ({ type: actionTypes.USER_SIGN_IN });
export const setSignOut = () => ({ type: actionTypes.USER_SIGN_OUT });
