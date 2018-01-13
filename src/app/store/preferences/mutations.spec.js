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
});
