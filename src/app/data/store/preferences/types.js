import namespace from '@/app/data/store/namespace';

export default namespace('preferences', {
  getters: ['isTrustedDevice', 'doAskTrusted'],
  actions: ['testTrustedDevice', 'trustDevice', 'untrustDevice', 'disableTrustReminder'],
  mutations: ['SET_TRUSTED_DEVICE', 'SET_ASK_TRUSTED', 'TRUST_DEVICE', 'UNTRUST_DEVICE', 'UPDATE_TRUSTED_STATUS']
});
