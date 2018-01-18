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
});
