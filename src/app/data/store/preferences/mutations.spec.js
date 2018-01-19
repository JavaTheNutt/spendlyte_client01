/*global describe*/
/*global it*/
import types from './types';
import mutations from './mutations';

describe('preferences mutations', () => {
  describe('SET_TRUSTED_DEVICE', () => {
    it('should set "trustedDevice" to true', () => {
      const state = {
        trustedDevice: false
      };
      mutations[types.mutations.SET_TRUSTED_DEVICE](state, true);
      expect(state.trustedDevice).to.be.true;
    });
    it('should set "trustedDevice" to false', () => {
      const state = {
        trustedDevice: true
      };
      mutations[types.mutations.SET_TRUSTED_DEVICE](state, false);
      expect(state.trustedDevice).to.be.false;
    });
  });
  describe('SET_ASK_TRUSTED', () => {
    it('should set "askTrusted" to true', () => {
      const state = {
        trustedDevice: false,
        askTrusted: false
      };
      mutations[types.mutations.SET_ASK_TRUSTED](state, true);
      expect(state.askTrusted).to.be.true;
    });
    it('should set "askTrusted" to false', () => {
      const state = {
        trustedDevice: false,
        askTrusted: true
      };
      mutations[types.mutations.SET_ASK_TRUSTED](state, false);
      expect(state.askTrusted).to.be.false;
    });
  });
  describe('TRUST_DEVICE', () => {
    const state = {
      trustedDevice: false,
      askTrusted: true
    };
    it('should set trusted to true', () => {
      mutations[types.mutations.TRUST_DEVICE](state);
      expect(state.trustedDevice).to.be.true;
    });
    it('should set ask to false', () => {
      mutations[types.mutations.TRUST_DEVICE](state);
      expect(state.askTrusted).to.be.false;
    });
  });
  describe('UNTRUST_DEVICE', () => {
    let state;
    beforeEach(() => {
      state = {
        trustedDevice: true,
        askTrusted: false
      };
    });
    it('should set trusted to false', () => {
      mutations[types.mutations.UNTRUST_DEVICE](state);
      expect(state.trustedDevice).to.be.false;
    });
    it('should set askTrusted to false when trustedDevice was true', () => {
      state.askTrusted = true;
      mutations[types.mutations.UNTRUST_DEVICE](state);
      expect(state.askTrusted).to.be.false;
    });
    it('should not change ask trusted when trustedDevice was false', () => {
      state.trustedDevice = false;
      state.askTrusted = true;
      mutations[types.mutations.UNTRUST_DEVICE](state);
      expect(state.askTrusted).to.be.true;
    });
  });
  describe('UPDATE_TRUSTED_STATUS', () => {
    it('should update the state to reflect the status', () => {
      const state = {
        trustedDevice: true,
        askTrusted: false
      };
      mutations[types.mutations.UPDATE_TRUSTED_STATUS](state, { trustedDevice: false, askTrusted: true });
      expect(state.trustedDevice).to.be.false;
      expect(state.askTrusted).to.be.true;
    });
  });
});
