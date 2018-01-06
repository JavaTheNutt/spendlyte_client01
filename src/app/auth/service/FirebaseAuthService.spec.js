import firebase from 'firebase';
import * as firebaseAuthService from './FirebaseAuthService';
import store from '@/store';
import types from '../vuex/types';

const sandbox = sinon.sandbox.create();

describe('FirebaseAuthService.js', () => {
  let signUpWithEmailAndPasswordStub, signInWithEmailAndPasswordStub, authContainer, authStub;
  beforeEach(() => {
    signUpWithEmailAndPasswordStub = sandbox.stub();
    signInWithEmailAndPasswordStub = sandbox.stub();
    authContainer = {
      createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub,
      signInWithEmailAndPassword: signInWithEmailAndPasswordStub
    };
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns(authContainer);
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
      beforeEach(() => {
        signInWithEmailAndPasswordStub.throws(Error('I am an error'));
        signUpWithEmailAndPasswordStub.throws(Error('I am an error'));
      });
      it('should return false when login is unsuccessful', async () => {
        submissionDetails.createNew = true;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.false;
      });
      it('should return false when sign up is unsuccessful', async () => {
        submissionDetails.createNew = false;
        const result = await firebaseAuthService.loginEventTriggered(submissionDetails.email, submissionDetails.password, submissionDetails.createNew);
        expect(result).to.be.false;
      });
    });
  });
  /* describe('signUpWithEmailAndPassword', () => {
    it('should handle successful sign ups', async () => {
      signUpWithEmailAndPasswordStub.resolves(true);
      const result = await firebaseAuthService.signUpWithEmailAndPassword('root@root.com', 'zzzzzz');
      expect(signUpWithEmailAndPasswordStub).to.be.calledOnce;
      expect(result).to.be.true;
    });
    it('should gracefully handle errors', async () => {
      signUpWithEmailAndPasswordStub.throws(Error('i am an error'));
      const result = await firebaseAuthService.signUpWithEmailAndPassword('root@root.com', 'zzzzzz');
      expect(signUpWithEmailAndPasswordStub).to.be.calledOnce;
      expect(result).to.be.false;
    });
  });*/
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
});
