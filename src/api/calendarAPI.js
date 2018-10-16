const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;
const STORAGE_TOKEN_DATA = 'googleAPIToken';

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export function initCalendarAPI() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  document.body.appendChild(script);
  script.onload = () => {
    window['gapi'].load('client:auth2', initClient);
  };

  return true;
}

function initClient() {
  let gapi = window['gapi'];

  // get saved token
  let token = checkTokenInStorage();
  if (token) {
    gapi.client.setToken(token);
    return;
  }

  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    return gapi.auth2.getAuthInstance().signIn();
  }).then(user => {
    saveTokenToStorage(user.Zi);
  }).catch((err) => {
    console.log(err);
  });
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