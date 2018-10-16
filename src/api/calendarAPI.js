const CLIENT_ID = process.env.REACT_APP_CALENDAR_CLIENT_ID;
const API_KEY = process.env.REACT_APP_CALENDAR_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
//const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

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
  var gapi = window['gapi'];

  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    return gapi.auth2.getAuthInstance().signIn();
  }).then(user => {
    console.log(user);
  }).catch((err) => {
    console.log(err);
  });
}
