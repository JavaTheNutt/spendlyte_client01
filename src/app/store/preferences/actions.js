import types from './types';
import { clientDataStore } from '@/app/localForage/init';

export default {
  [types.actions.testTrustedDevice]: async ({ commit }) => {
    const isTrusted = await clientDataStore.getPreference('trusted_device') || false;
    commit(types.mutations.SET_TRUSTED_DEVICE, isTrusted);
    if (isTrusted) return commit(types.mutations.SET_ASK_TRUSTED, false);
    const askTrusted = await clientDataStore.getPreference('ask_trusted');
    if (askTrusted) return commit(types.mutations.SET_ASK_TRUSTED, true);

    return commit(types.mutations.SET_ASK_TRUSTED, askTrusted !== false);
  }
};
