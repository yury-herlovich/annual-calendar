const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;
const STORAGE_TOKEN_DATA = 'googleAPIToken';

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

let gapiLoaded = false;
let clientIsInit = false;
let tokenExpiresAt = null;

export function initCalendarAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  document.body.appendChild(script);
  script.onload = () => {
    window['gapi'].load('client:auth2', () => {
      gapiLoaded = true;
    });
  };
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
  let gapi = await getGAPIInstance();

  return gapi.client.request({
    path,
    method,
    params
  });
}


async function getGAPIInstance() {
  if (!gapiLoaded) {
    await waitGAPIloading();
  }

  if (!clientIsInit || Date.now() - 2000 > tokenExpiresAt) {
    await initClient();
  }

  return Promise.resolve(window['gapi']);
}


function waitGAPIloading() {
  if (gapiLoaded) {
    return Promise.resolve(true);
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        waitGAPIloading().then(() => resolve(true));
      }, 100);
    })
  }
}


function initClient() {
  let gapi = window['gapi'];

  // get saved token
  let token = checkTokenInStorage();
  if (token) {
    gapi.client.setToken(token);

    clientIsInit = true;
    tokenExpiresAt = token.expires_at;

    return Promise.resolve(true);
  }

  return gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    return gapi.auth2.getAuthInstance().signIn();
  }).then(user => {
    let token = user.Zi;

    saveTokenToStorage(token);

    clientIsInit = true;
    tokenExpiresAt = token.expires_at;

    return Promise.resolve(true);
  }).catch((err) => {console.log(err)});
}


function saveTokenToStorage(tokenData) {
  localStorage.setItem(STORAGE_TOKEN_DATA, JSON.stringify(tokenData));
}


function checkTokenInStorage() {
  let tokenString = localStorage.getItem(STORAGE_TOKEN_DATA);

  if (tokenString === null) return null;

  try {
    let token = JSON.parse(tokenString);

    if (token.expires_at <= Date.now()) {
      throw new Error('Expired token');
    }

    return token;
  } catch (err) {
    localStorage.removeItem(STORAGE_TOKEN_DATA);
    return null;
  }
}
