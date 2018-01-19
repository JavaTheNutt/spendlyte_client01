// @flow

import * as Logger from 'loglevel';
import Bus from '@/app/events/bus';
import firebase from 'firebase';
import store from '@/store';
import router from '@/router';
import types from '../vuex/types';

/**
 * Either log in or signup.
 * @param email {String} the email address to be used
 * @param password {String} the password to be used
 * @param createNew {boolean} flag for login or signup. true for signup, false for login
 * @returns {Promise<boolean>} true if operation successful, false otherwise
 */
export const loginEventTriggered = async (email: String, password: String, createNew: boolean) => {
  Logger.info('login event triggered');
  Logger.debug('creating new account? ', createNew);
  const fn = createNew ? signUpWithEmailAndPassword : signInWithEmailAndPassword;
  const res : { success?: boolean, error?: Object} = await fn(email, password);
  if (res.error) {
    Bus.$emit('show-snack', res.error.msg, 'error');
  }
  return !res.error;
};

/**
 * Register Firebase Auth State Listener
 */
export const registerAuthStateListener = () => {
  Logger.info('registering auth state listener');
  firebase.auth().onAuthStateChanged(user => authStateChanged(user));
};

/**
 * Callback for Auth State Changed Listener. Publicly exposed for unit testing purposes.
 * @param user {Object} the firebase user. If provided, considered as sign in, if not, sign out
 */
export const authStateChanged = (user: ?Object) => {
  Logger.info('user:', user);
  user ? logIn(user) : logOut();
};

/**
 * Sign out of Firebase
 * @returns {Promise<boolean>} true if sign out successful, false otherwise
 */
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

/**
 *  User logged in, trigger relevant events
 * @param user {Object} the user who logged in
 */
const logIn = (user: Object) => {
  store.dispatch(types.actions.logIn);
  router.push('/profile');
};

/**
 * User logged out, trigger relevant events
 */
const logOut = () => {
  store.dispatch(types.actions.logOut);
  router.push('/');
};

/**
 * Create a new user using an email password combination
 * @param email {String} the email address to be used
 * @param password {String} the password to be used
 * @returns {Promise<boolean | object>} true if sign up successful, false otherwise
 */
const signUpWithEmailAndPassword = async (email: String, password: String) : {success?: boolean, error?: Object} => {
  Logger.info('attempting to sign up with email and password');
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    Logger.debug('sign up assumed successful');
    return { success: true };
  } catch (e) {
    Logger.warn('there was an error while signing up', e);
    return { error: { msg: handleFirebaseError(e.code) }};
  }
};

/**
 * Login with email and password
 * @param email {String} the email address to be used
 * @param password {String} the password to be used
 * @returns {Promise<object>} true if sign in successful, false otherwise
 */
const signInWithEmailAndPassword = async (email: String, password: String) : {success?: boolean, error?: Object} => {
  Logger.info('attempting to sign in with email and password');
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Logger.debug('sign in assumed successful');
    return { success: 'true' };
  } catch (e) {
    Logger.warn('there was an error while signing in', e);
    return { error: { msg: handleFirebaseError(e.code) }};
  }
};
const handleFirebaseError = (errCode: String) => {
  switch (errCode) {
  case 'auth/user-not-found':
    return 'Email is not registered on the system';
  case 'auth/wrong-password':
    return 'Password is incorrect';
  case 'auth/email-already-in-use':
    return 'The specified email address is already in use';
  case 'auth/invalid-email':
    return 'The specified email address is invalid';
  case 'auth/weak-password':
    return 'The specified password is too weak';
  case 'auth/account-exists-with-different-credential':
    return 'You already signed into this app using the same email, but from a different provider';
  default:
    return 'An unknown error has occurred';
  }
};

