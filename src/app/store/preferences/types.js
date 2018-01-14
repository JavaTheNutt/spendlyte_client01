import namespace from '@/app/util/namespace';

export default namespace('preferences', {
  getters: ['isTrustedDevice', 'doAskTrusted'],
  actions: ['testTrustedDevice', 'trustDevice'],
  mutations: ['SET_TRUSTED_DEVICE', 'SET_ASK_TRUSTED']
});
