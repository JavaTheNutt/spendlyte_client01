import namespace from '@/app/util/namespace';

export default namespace('preferences', {
  getters: ['isTrustedDevice', 'doAskTrusted'],
  actions: ['testTrustedDevice', 'trustDevice', 'untrustDevice', 'doNotAskToTrustDevice'],
  mutations: ['SET_TRUSTED_DEVICE', 'SET_ASK_TRUSTED', 'TRUST_DEVICE', 'UNTRUST_DEVICE', 'UPDATE_TRUSTED_STATUS']
});
