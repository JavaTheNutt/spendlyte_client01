import firebase from 'firebase';
import Bus from '@/app/events/bus';
import * as firebaseAuthService from './FirebaseAuthService';
import store from '@/store';
import types from '../vuex/types';

const sandbox = sinon.sandbox.create();

describe('FirebaseAuthService.js', () => {
  let signUpWithEmailAndPasswordStub, signInWithEmailAndPasswordStub, authContainer, authStub, onAuthStateChangedStub, emitStub;
  beforeEach(() => {
    signUpWithEmailAndPasswordStub = sandbox.stub();
    signInWithEmailAndPasswordStub = sandbox.stub();
    onAuthStateChangedStub = sandbox.stub();
    authContainer = {
      createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub,
      signInWithEmailAndPassword: signInWithEmailAndPasswordStub,
      onAuthStateChanged: onAuthStateChangedStub
    };
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns(authContainer);
    emitStub = sandbox.stub(Bus, '$emit');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('loginEventTriggered', () => {
    let submissionDetails;
    beforeEach(() => {
      submissionDetails = {
        email: 'joe.bloggs@test.com',
        password: 'mmmmmm',
        createNew: false
      };
    });
    describe('success', () => {
      beforeEach(() => {
        signInWithEmailAndPasswordStub.resolves(true);
        signUpWithEmailAndPasswordStub.resolves(true);
      });
      it('should trigger firebase.auth().signInWithEmailAndPassword', async () => {
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.true;
        expect(signInWithEmailAndPasswordStub).to.be.calledOnce;
        expect(signUpWithEmailAndPasswordStub).to.not.be.called;
      });
      it('should trigger firebase.auth().createUserWithEmailAndPassword', async () => {
        submissionDetails.createNew = true;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.true;
        expect(signUpWithEmailAndPasswordStub).to.be.calledOnce;
        expect(signInWithEmailAndPasswordStub).to.not.be.called;
      });
      it('should return true when logging in is successful', async () => {
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.true;
      });
      it('should return true when signing up is successful', async () => {
        submissionDetails.createNew = true;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.true;
      });
    });
    describe('failure', () => {
      it('should return false when login is unsuccessful', async () => {
        signInWithEmailAndPasswordStub.throws(Error('I am an error'));
        submissionDetails.createNew = false;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.false;
      });
      it('should return false when sign up is unsuccessful', async () => {
        signUpWithEmailAndPasswordStub.throws(Error('I am an error'));
        submissionDetails.createNew = true;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.false;
      });
      it('should trigger the snackbar when auth fails', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/user-not-found';
        signInWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = false;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack');
      });
      it('should trigger the snackbar when the user is not found', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/user-not-found';
        signInWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = false;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'Email is not registered on the system');
      });
      it('should trigger the snackbar when the wrong password is provided', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/wrong-password';
        signInWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = false;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'Password is incorrect');
      });
      it('should trigger the snackbar when an invalid email is provided', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/invalid-email';
        signUpWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = true;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'The specified email address is invalid');
      });
      it('should trigger the snackbar when a weak password is provided', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/weak-password';
        signUpWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = true;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'The specified password is too weak');
      });
      it('should trigger the snackbar when the specified email is already in use', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/email-already-in-use';
        signUpWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = true;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'The specified email address is already in use');
      });
      it('should trigger the snackbar when auth exists with different credentials', async () => {
        const error = new Error('i am an error');
        error.code = 'auth/account-exists-with-different-credential';
        signUpWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = true;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'You already signed into this app using the same email, but from a different provider');
      });
      it('should trigger the snackbar when auth fails for unknown reasons', async () => {
        const error = new Error('i am an error');
        signUpWithEmailAndPasswordStub.throws(error);
        submissionDetails.createNew = true;
        await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('show-snack', 'An unknown error has occurred');
      });
    });
  });
  describe('authStateChanged', () => {
    describe('log in', () => {
      it('should update the store with the logged in variable to true', () => {
        store.commit(types.mutations.SET_LOGGED_IN, false);
        expect(store.state.auth.loggedIn).to.be.false;
        const user = {
          uid: 'someuid',
          email: 'joebloggs@test.com'
        };
        firebaseAuthService.authStateChanged(user);
        expect(store.state.auth.loggedIn).to.be.true;
      });
    });
    describe('log out', () => {
      it('should update the store with the logged in variable to false', () => {
        store.commit(types.mutations.SET_LOGGED_IN, true);
        expect(store.state.auth.loggedIn).to.be.true;
        firebaseAuthService.authStateChanged();
        expect(store.state.auth.loggedIn).to.be.false;
      });
    });
  });
  describe('registerAuthStateListener', () => {
    it('should call Firebase.auth().onAuthStateChanged', () => {
      firebaseAuthService.registerAuthStateListener();
      expect(onAuthStateChangedStub).calledOnce;
    });
  });
  /* describe('signOut', () => {

  });*/
});
