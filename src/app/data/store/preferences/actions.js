import types from './types';
import { clientDataStore } from '@/app/data/localForage/init';
;

export default {
  [types.actions.testTrustedDevice]: async ({ commit }) => {
    const isTrusted = await clientDataStore.getPreference('trusted_device') || false;
    console.log('setting device to trusted?', isTrusted);
    commit(types.mutations.SET_TRUSTED_DEVICE, isTrusted);
    if (isTrusted) return commit(types.mutations.SET_ASK_TRUSTED, false);
    const askTrusted = await clientDataStore.getPreference('ask_trusted');
    if (askTrusted) return commit(types.mutations.SET_ASK_TRUSTED, true);
    return commit(types.mutations.SET_ASK_TRUSTED, askTrusted !== false);
  },
  [types.actions.trustDevice]: async ({ commit }) => {
    console.log('action called to trust current device');
    await clientDataStore.trustDevice();
    commit(types.mutations.TRUST_DEVICE);
    // commit(types.mutations.SET_ASK_TRUSTED, false);
  },
  [types.actions.untrustDevice]: async ({ commit }) => {
    const trustDetails = await clientDataStore.untrustDevice();
    commit(types.mutations.UPDATE_TRUST_STATUS, trustDetails);
  }
};
