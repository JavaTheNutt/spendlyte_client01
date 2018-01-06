// @flow
import * as Logger from 'loglevel';
import firebase from 'firebase';
// eslint-disable-next-line flowtype-errors/show-errors
import store from '@/store';
// eslint-disable-next-line flowtype-errors/show-errors
import router from '@/router';
import types from '../vuex/types';

/**
 * Either log in or signup.
 * @param email {String} the email address to be used
 * @param password {String} the password to be used
 * @param createNew {boolean} flag for login or signup. true for signup, false for login
 * @returns {Promise<boolean>} true if operation successful, false otherwise
 */
export const loginEventTriggered = async (email: String, password:String, createNew: boolean) => {
  Logger.info('login event triggered');
  Logger.debug('creating new account? ', createNew);
  const fn = createNew ? signUpWithEmailAndPassword : signInWithEmailAndPassword;
  return await fn(email, password);
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
 * @returns {Promise<boolean>} true if sign up successful, false otherwise
 */
const signUpWithEmailAndPassword = async (email: String, password: String) => {
  Logger.info('attempting to sign up with email and password');
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    Logger.debug('sign up assumed successful');
    return true;
  } catch (e) {
    Logger.warn('there was an error while signing up', e);
    return false;
  }
};

/**
 * Login with email and password
 * @param email {String} the email address to be used
 * @param password {String} the password to be used
 * @returns {Promise<boolean>} true if sign in successful, false otherwise
 */
const signInWithEmailAndPassword = async (email: String, password:String) => {
  Logger.info('attempting to sign in with email and password');
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    Logger.debug('sign in assumed successful');
    return true;
  } catch (e) {
    Logger.warn('there was an error while signing in', e);
    return false;
  }
};
