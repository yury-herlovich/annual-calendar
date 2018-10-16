import * as actionTypes from '../constants/actionTypes';

export function setYear(year) {
  const startDate = year + '-01-01T00:00:00';
  const endDate = year + '-12-31T23:59:59';

  return {
    type: actionTypes.SET_YEAR,
    year
  }
}