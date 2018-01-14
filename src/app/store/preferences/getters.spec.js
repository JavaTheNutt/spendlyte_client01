import getters from './getters';
import types from './types';
describe('preferences getters', () => {
  describe('doAskTrusted', () => {
    it('should return false when the device is trusted', () => {
      const state = {
        trustedDevice: true,
        askTrusted: true
      };
      expect(getters[types.getters.doAskTrusted](state)).to.be.false;
    });
    it('should return true when the device is untrusted and ask is true', () => {
      const state = {
        trustedDevice: false,
        askTrusted: true
      };
      expect(getters[types.getters.doAskTrusted](state)).to.be.true;
    });
    it('should return false when the device is untrusted and ask is false', () => {
      const state = {
        trustedDevice: false,
        askTrusted: false
      };
      expect(getters[types.getters.doAskTrusted](state)).to.be.false;
    });
  });
});
