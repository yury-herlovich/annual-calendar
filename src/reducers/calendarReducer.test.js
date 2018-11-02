import calendarReducer, { initialState } from './calendarReducer';
import * as actionTypes from '../constants/ActionTypes';

it('return default state', () => {
  const action = { type: 'default_action' };

  expect(calendarReducer(undefined, action)).toEqual(initialState);
});


it('google client loaded', () => {
  const expectedState = {
    ...initialState,
    googleClientLoaded: true
  }

  const action = { type: actionTypes.GOOGLE_CLIENT_LOADED };

  expect(calendarReducer(undefined, action)).toEqual(expectedState);
});


it('set year', () => {
  const year = 3000;
  const expectedState = {
    ...initialState,
    year
  }

  const action = { type: actionTypes.SET_YEAR, year };

  expect(calendarReducer(undefined, action)).toEqual(expectedState);
});


it('clear events', () => {
  const events = [{id: 123, title: 'test'}, {id: 321}];
  const eventPosById = {123: 0, 321: 1};
  const state = {
    ...initialState,
    events,
    eventPosById
  };

  const action = { type: actionTypes.CLEAR_EVENTS };

  expect(calendarReducer(state, action)).toEqual(initialState);
});


it('set events', () => {
  const events = [{id: 123, title: 'test'}, {id: 321}];
  const expectedState = {
    ...initialState,
    events,
    eventPosById: {123: 0, 321: 1}
  }

  const action = { type: actionTypes.SET_EVENTS, events };

  expect(calendarReducer(undefined, action)).toEqual(expectedState);
});


it('add events', () => {
  const events = [{id: 123, title: 'test'}, {id: 321}];
  const newEvent = [{id: 111, title: 'new event'}];

  const state = {
    ...initialState,
    events,
    eventPosById: {123: 0, 321: 1}
  };

  const expectedState = {
    ...initialState,
    events: events.concat(newEvent),
    eventPosById: {123: 0, 321: 1, 111: 2}
  };

  const action = { type: actionTypes.SET_EVENTS, events: newEvent };

  expect(calendarReducer(state, action)).toEqual(expectedState);
});


it('update event', () => {
  const events = [{id: 123, title: 'test'}, {id: 321}];
  const newEvent = [{id: 123, title: 'new event'}];
  const eventPosById = {123: 0, 321: 1};

  const state = {
    ...initialState,
    events,
    eventPosById
  };

  const expectedState = {
    ...initialState,
    events: [newEvent[0], events[1]],
    eventPosById
  };

  const action = { type: actionTypes.SET_EVENTS, events: newEvent };

  expect(calendarReducer(state, action)).toEqual(expectedState);
});


it('set loading', () => {
  const expectedState = {
    ...initialState,
    isLoading: true
  }

  const action = { type: actionTypes.SET_LOADING, isLoading: true};

  expect(calendarReducer(undefined, action)).toEqual(expectedState);
});
