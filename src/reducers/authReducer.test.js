import authReducer, { initialState } from './authReducer';
import * as actionTypes from '../constants/ActionTypes';

it('return default state', () => {
  const action = { type: 'default_action' };

  expect(authReducer(undefined, action)).toEqual(initialState);
});


it('user sign in', () => {
  let expectedState = {
    ...initialState,
    isSignIn: true
  };

  const action = { type: actionTypes.USER_SIGN_IN };

  expect(authReducer(undefined, action)).toEqual(expectedState);
});


it('user sign out', () => {
  let expectedState = {
    ...initialState,
    isSignIn: false
  };

  const action = { type: actionTypes.USER_SIGN_OUT };

  expect(authReducer(undefined, action)).toEqual(expectedState);
});