import types from './types';

export default {
  [types.mutations.SET_TRUSTED_DEVICE]: (state, trustedDevice) => state.trustedDevice = trustedDevice
};
