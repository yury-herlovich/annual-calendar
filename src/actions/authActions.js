import { signIn as firebaseSignIn } from '../api/firebase';
import * as actionTypes from '../constants/actionTypes';

export function signIn() {
  return (dispatch) => {
    firebaseSignIn()
      .then(() => {
        dispatch({type: actionTypes.USER_SIGN_IN});
      });
  }
}