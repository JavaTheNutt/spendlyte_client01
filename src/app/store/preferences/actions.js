import types from './types';
import { clientDataStore } from '@/app/localForage/init';

export default {
  [types.actions.testTrustedDevice]: async ({ commit }) => {
    const isTrusted = await clientDataStore.getPreference('trusted_device') || false;
    commit(types.mutations.SET_TRUSTED_DEVICE, isTrusted);
  }
};
