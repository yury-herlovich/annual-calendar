import modalReducer, { initialState } from './modalReducer';
import * as actionTypes from '../constants/ActionTypes';

it('return default state', () => {
  const action = { type: 'default_action' };

  expect(modalReducer(undefined, action)).toEqual(initialState);
});


it('open modal window', () => {
  let ids = [123];
  let clickCoordinates = {x: 0, y: 0};

  let expectedState = {
    ...initialState,
    eventsIds: ids,
    clickCoordinates
  };

  const action = {
    type: actionTypes.MODAL_OPEN,
    ids,
    clickCoordinates
  };

  expect(modalReducer(undefined, action)).toEqual(expectedState);
});

it('close modal window', () => {
  let ids = [123];
  let clickCoordinates = {x: 0, y: 0};

  let state = {
    ...initialState,
    eventsIds: ids,
    clickCoordinates
  };

  const action = { type: actionTypes.MODAL_CLOSE };

  expect(modalReducer(state, action)).toEqual(initialState);
});