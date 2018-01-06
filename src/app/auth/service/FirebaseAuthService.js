// @flow
import * as Logger from 'loglevel';
import firebase from 'firebase';
// eslint-disable-next-line flowtype-errors/show-errors
import store from '@/store';
// eslint-disable-next-line flowtype-errors/show-errors
import router from '@/router';
import types from '../vuex/types';

export const signUpWithEmailAndPassword = async (email: String, password: String) => {
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
export const signInWithEmailAndPassword = async (email: String, password:String) => {
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
export const loginEventTriggered = async (email: String, password:String, createNew: boolean) => {
  Logger.info('login event triggered');
  Logger.debug('creating new account? ', createNew);
  const fn = createNew ? signUpWithEmailAndPassword : signInWithEmailAndPassword;
  return await fn(email, password);
};
export const registerAuthStateListener = () => {
  Logger.info('registering auth state listener');
  firebase.auth().onAuthStateChanged(user => authStateChanged(user));
};

export const authStateChanged = (user: Object) => {
  Logger.info('user:', user);
  user ? logIn(user) : logOut();
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

const logIn = user => {
  store.dispatch(types.actions.logIn);
  router.push('/profile');
};

const logOut = () => {
  store.dispatch(types.actions.logOut);
  router.push('/');
};
