import namespace from '@/app/util/namespace';

export default namespace('preferences', {
  getters: ['isTrustedDevice'],
  actions: ['testTrustedDevice'],
  mutations: ['SET_TRUSTED_DEVICE']
});
