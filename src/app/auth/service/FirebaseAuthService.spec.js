import firebase from 'firebase';
import * as firebaseAuthService from './FirebaseAuthService';
import store from '@/store';
import types from '../vuex/types';
const sandbox = sinon.sandbox.create();

describe('FirebaseAuthService.js', () => {
  let signUpWithEmailAndPasswordStub, authContainer, authStub; // , dispatchStub;
  beforeEach(() => {
    signUpWithEmailAndPasswordStub = sandbox.stub();
    authContainer = { createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub };
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns(authContainer);
    // dispatchStub = sandbox.stub(store, 'dispatch');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('signUpWithEmailAndPassword', () => {
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
});
