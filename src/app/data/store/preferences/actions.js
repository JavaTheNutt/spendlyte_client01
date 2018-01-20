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
  },
  [types.actions.untrustDevice]: async ({ commit }) => {
    console.log('action called to untrust current device');
    const trustDetails = await preferenceDataStore.untrustDevice();
    console.log('trust details to be committed', trustDetails);
    commit(types.mutations.UPDATE_TRUSTED_STATUS, trustDetails);
  },
  [types.actions.disableTrustReminder]: async ({ commit }) => {
    console.log('action called to disable trust reminder');
    commit(types.mutations.UPDATE_TRUSTED_STATUS, await preferenceDataStore.disableTrustReminder());
  }
};
