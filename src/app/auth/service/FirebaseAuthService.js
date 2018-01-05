import * as Logger from 'loglevel';
import firebase from 'firebase';

export const signUpWithEmailAndPassword = async (email, password) => {
  Logger.info('attempting to sign in with email and password');
  try {
    await firebase.auth().signUpWithEmailAndPassword(email, password);
    Logger.debug('sign up assumed successful');
    return true;
  } catch (e) {
    Logger.warn('there was an error while signing up', e);
    return false;
  }
};
