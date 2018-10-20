import * as firebase from 'firebase/app';
import 'firebase/auth';
import { initCalendarAPI } from './calendarAPI';

const STORAGE_TOKEN_DATA = 'googleCredentials';

export function initFirebase() {
  const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`
  };

  firebase.initializeApp(config);
}

export async function signIn() {
  initFirebase();

  // await firebase.auth().signOut();

  let user = await checkIsUserSignIn();

  if (user) {
    await initCalendarAPI(getCredential());
    return Promise.resolve(user);
  }

  let provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope(process.env.REACT_APP_SCOPE);

  let authResult = await firebase.auth().signInWithPopup(provider);

  if (authResult) {
    saveCredential(authResult.credential);

    await initCalendarAPI(authResult.credential);
    return Promise.resolve(authResult.user);
  } else {
    return Promise.reject();
  }
}

function checkIsUserSignIn() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

function saveCredential(credentials) {
  localStorage.setItem(STORAGE_TOKEN_DATA, JSON.stringify(credentials));
}

function getCredential() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_TOKEN_DATA));
  } catch (e) {
    return false;
  }
}