const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
const SCOPE = 'https://www.googleapis.com/auth/calendar';

const apiSrc = 'https://apis.google.com/js/api.js';
// const apiSrc = 'https://apis.google.com/js/platform.js';

export function loadGoogleClient() {
  const script = document.createElement('script');
  script.src = apiSrc;
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      resolve();
    }});
}

export function initGoogleClient() {
  return new Promise((resolve, reject) => {
    let gapi = window['gapi'];

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPE,
        ux_mode: 'redirect',
        redirect_uri: `${process.env.REACT_APP_HOST}`
      }).then(() => {
        // window['gapi'].auth2.getAuthInstance().signOut();

        resolve();
      }).catch(() => {
        reject()
      });
    });
  });
}

export async function userIsSignIn(signIn = false) {
  // if client is not initialized
  if (window['gapi'].auth2 === undefined) {
    await initGoogleClient();
  }

  let GoogleAuth = window['gapi'].auth2.getAuthInstance();

  let user = GoogleAuth.currentUser.get();
  let tokenExpiration = user.getAuthResponse().expires_at - Date.now();

  // refresh token
  if (tokenExpiration < -3600000) {
    await initGoogleClient();
  }

  let isAuthorized = user.hasGrantedScopes(SCOPE);

  if (isAuthorized) {
    return Promise.resolve(true);
  } else if (signIn) {
    return GoogleAuth.signIn()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.reject());
  } else {
    return Promise.resolve(false);
  }
}

export function googleSignOut() {
  return window['gapi'].auth2.getAuthInstance().signOut();
}