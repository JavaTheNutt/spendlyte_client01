import types from './types';

export default {
  [types.mutations.SET_TRUSTED_DEVICE]: (state, trustedDevice) => state.trustedDevice = trustedDevice,
  [types.mutations.SET_ASK_TRUSTED]: (state, askTrusted) => state.askTrusted = askTrusted,
  [types.mutations.TRUST_DEVICE]: state => {
    state.askTrusted = false;
    state.trustedDevice = true;
  }
};
