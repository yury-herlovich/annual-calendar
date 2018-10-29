import { userIsSignIn } from './googleAuthAPI';
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

export function apiGetEvents(startDate, endDate) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
  let method = 'GET';
  let params = {
    key: process.env.REACT_APP_API_KEY,
    maxResults: 100,
    timeMax: endDate.toISOString(),
    timeMin: startDate.toISOString()
  }

  return sendApiRequest(path, method, params);
}


export function apiGetEvent(id) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${id}`;
  let method = 'GET';

  return sendApiRequest(path, method, {});
}


export function apiPatchEvent(id, data) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${id}`;
  let method = 'PATCH';

  return sendApiRequest(path, method, {}, data);
}


export function apiAddEvent(data) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
  let method = 'POST';

  return sendApiRequest(path, method, {}, data);
}


export function apiDeleteEvent(id) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${id}`;
  let method = 'DELETE';

  return sendApiRequest(path, method);
}


async function sendApiRequest(path, method, params, body) {
  await userIsSignIn();

  let gapi = window['gapi'];

  return gapi.client.request({
    path,
    method,
    params,
    body
  });
}