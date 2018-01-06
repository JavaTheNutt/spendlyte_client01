import firebase from 'firebase';
import * as firebaseAuthService from './FirebaseAuthService';

const sandbox = sinon.sandbox.create();

describe('FirebaseAuthService.js', () => {
  let signUpWithEmailAndPasswordStub, authContainer, authStub;
  beforeEach(() => {
    signUpWithEmailAndPasswordStub = sandbox.stub();
    authContainer = { createUserWithEmailAndPassword: signUpWithEmailAndPasswordStub };
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns(authContainer);
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
});
