// @flow
import types from './types';

export default {
  [types.mutations.SET_TRUSTED_DEVICE]: (state, trustedDevice:boolean) => state.trustedDevice = trustedDevice,
  [types.mutations.SET_ASK_TRUSTED]: (state, askTrusted:boolean) => state.askTrusted = askTrusted,
  [types.mutations.TRUST_DEVICE]: state => {
    state.askTrusted = false;
    state.trustedDevice = true;
  },
  [types.mutations.UNTRUST_DEVICE]: state => {
    if (state.trustedDevice) state.askTrusted = false;
    state.trustedDevice = false;
  },
  [types.mutations.UPDATE_TRUSTED_STATUS]: (state, trustedDetails:{trustedDevice:boolean, askTrusted:boolean}) => {
    state.trustedDevice = trustedDetails.trustedDevice;
    state.askTrusted = trustedDetails.askTrusted;
  }
};
