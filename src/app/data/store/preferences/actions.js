// @flow
import types from './types';
import { preferenceDataStore } from '@/app/data/localForage/PreferenceDataStore';

export default {
  [types.actions.testTrustedDevice]: async ({ commit }) => {
    const trustStatus: Promise<{askTrusted:boolean, trustedDevice: boolean}> = await preferenceDataStore.fetchTrustStatus();
    console.debug('current trust status', trustStatus);
    commit(types.mutations.UPDATE_TRUSTED_STATUS, trustStatus);
  },
  [types.actions.trustDevice]: async ({ commit }) => {
    console.log('action called to trust current device');
    await preferenceDataStore.trustDevice();
    commit(types.mutations.TRUST_DEVICE);
    // commit(types.mutations.SET_ASK_TRUSTED, false);
  },
  [types.actions.untrustDevice]: async ({ commit }) => {
    const trustDetails = await preferenceDataStore.untrustDevice();
    commit(types.mutations.UPDATE_TRUSTED_STATUS, trustDetails);
  },
  [types.actions.disableTrustReminder]: async ({ commit }) => commit(types.mutations.UPDATE_TRUSTED_STATUS, await preferenceDataStore.disableTrustReminder())
};
