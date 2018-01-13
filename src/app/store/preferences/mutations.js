import types from './types';

export default {
  [types.mutations.SET_TRUSTED_Device]: (state, trustedDevice) => state.trustedDevice = trustedDevice
};
