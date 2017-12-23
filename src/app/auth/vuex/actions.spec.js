import types from './types';
import actions from './actions';

const sandbox = sinon.sandbox.create();
describe('auth actions', () => {
  let commitStub;
  beforeEach(() => {
    commitStub = sandbox.spy();
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('log in', () => {
    it('should commit "true"', () => {
      actions[types.actions.logIn]({ commit: commitStub });
      expect(commitStub).to.be.calledOnce;
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, true);
    });
  });
  describe('log out', () => {
    it('should commit "false"', () => {
      actions[types.actions.logOut]({ commit: commitStub });
      expect(commitStub).to.be.calledOnce;
      expect(commitStub).to.be.calledWith(types.mutations.SET_LOGGED_IN, false);
    });
  });
});
