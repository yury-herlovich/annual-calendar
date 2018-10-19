const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPE = process.env.REACT_APP_SCOPE;

export function initCalendarAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
    }
  }).then(() => {
    return new Promise((resolve, reject) => {
      window['gapi'].load('client:auth2', () => {
        resolve();
      });
    });
  }).then(() => {
    return window['gapi'].client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPE
    });
  }).catch(err => console.log(err));
}


export function apiGetEvents(startDate, endDate) {
  let path = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;
  let method = 'GET';
  let params = {
    key: process.env.REACT_APP_CALENDAR_API_KEY,
    maxResults: 100,
    timeMax: endDate.toISOString(),
    timeMin: startDate.toISOString()
  }

  return sendApiRequest(path, method, params);
}


async function sendApiRequest(path, method, params) {
  let gapi = window['gapi'];

  return gapi.client.request({
    path,
    method,
    params
  });
}