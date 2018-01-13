import types from './types';

export default {
  [types.getters.isTrustedDevice]: state => state.trustedDevice
};
