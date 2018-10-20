const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPE = process.env.REACT_APP_SCOPE;

let clientIsInit = false;

export function initGoogleClient() {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/platform.js";
  document.body.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      let gapi = window['gapi'];

      gapi.load('client:auth2', () => {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPE
        }).then(() => {
          let GoogleAuth = gapi.auth2.getAuthInstance();

          GoogleAuth.isSignedIn.listen(updateSigninStatus);
        }).then(() => {
          clientIsInit = true;
          resolve();
        }).catch(() => {
          reject()
        });
      });
    }
  });
}

export async function userIsSignIn() {
  if (!clientIsInit) {
    await initGoogleClient();
  }

  let GoogleAuth = window['gapi'].auth2.getAuthInstance();

  // await GoogleAuth.signOut();

  let user = GoogleAuth.currentUser.get();
  let isAuthorized = user.hasGrantedScopes(SCOPE);

  // await user.reloadAuthResponse();
  // console.log(user.getAuthResponse());

  if (isAuthorized) {
    return Promise.resolve();
  } else {
    return GoogleAuth.signIn()
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  }
}

function updateSigninStatus(isSignedIn) {
  console.log('update sign status: is sign in - ', isSignedIn);
}