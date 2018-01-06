// @flow
import * as Logger from 'loglevel';
import firebase from 'firebase';

export const signUpWithEmailAndPassword = async (email: String, password: String) => {
  Logger.info('attempting to sign in with email and password');
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    Logger.debug('sign up assumed successful');
    return true;
  } catch (e) {
    Logger.warn('there was an error while signing up', e);
    return false;
  }
};

export const registerAuthStateListener = () => {
  Logger.info('registering auth state listener');
  firebase.auth().onAuthStateChanged(user => Logger.info('user logged in: ', user));
};

export const signOut = async () => {
  Logger.info('sign out function triggered');
  try {
    await firebase.auth().signOut();
    Logger.debug('sign out assumed successful');
    return true;
  } catch (e) {
    Logger.warn('error while signing out', e);
    return false;
  }
};
