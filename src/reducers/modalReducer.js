import * as actionTypes from '../constants/actionTypes';

export const initialState = {
  eventsIds: [],
  clickCoordinates: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_OPEN:
      return {
        ...state,
        eventsIds: action.ids,
        clickCoordinates: action.clickCoordinates
      }

    case actionTypes.MODAL_CLOSE:
    return {
      ...state,
      eventsIds: [],
      clickCoordinates: {}
    }

    default:
      return state;
  }
}