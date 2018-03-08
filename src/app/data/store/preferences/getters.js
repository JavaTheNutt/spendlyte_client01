import types from './types';

export default {
  [types.getters.isTrustedDevice]: state => state.trustedDevice,
  [types.getters.doAskTrusted]: state => state.trustedDevice ? false : state.askTrusted,
  [types.getters.shouldAskCookies]: state => !state.hideCookies
};
