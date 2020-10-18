import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState } from '../reducers/authReducer';
import * as actions from './authActions';
import * as actionTypes from '../constants/actionTypes';
import * as authAPI from '../api/googleAuthAPI';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
});

it('user sign in', () => {
  const expectedActions = [
    { type: actionTypes.USER_SIGN_IN }
  ];

  authAPI.userIsSignIn = jest.fn()
    .mockReturnValueOnce(true);


  return store.dispatch(actions.signIn()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
});
});