import types from './types';
import mutations from './mutations';

describe('auth mutations', () => {
  let state;
  beforeEach(() => {
    state = {
      loggedIn: false
    };
  });
  describe('SET LOGGED IN', () => {
    it('should set the logged in status to true when it is false', () => {
      mutations[types.mutations.SET_LOGGED_IN](state, true);
      expect(state.loggedIn).to.be.true;
    });
    it('should set the logged in status to false when it is true', () => {
      state.loggedIn = true;
      mutations[types.mutations.SET_LOGGED_IN](state, true);
      expect(state.loggedIn).to.be.true;
    });
    it('should set leave the state unchanged when it is being set to the value it is currently', () => {
      state.loggedIn = true;
      mutations[types.mutations.SET_LOGGED_IN](state, true);
      expect(state.loggedIn).to.be.true;
      state.loggedIn = false;
      mutations[types.mutations.SET_LOGGED_IN](state, false);
      expect(state.loggedIn).to.be.false;
    });
  });
});
