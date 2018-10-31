import * as actionTypes from '../constants/actionTypes';

export function openModalWindow(ids, clickCoordinates) {
  return {
    type: actionTypes.MODAL_OPEN,
    ids,
    clickCoordinates
  };
}

export function closeModalWindow() {
  return { type: actionTypes.MODAL_CLOSE };
}