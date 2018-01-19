import types from './types';

export default {
  [types.getters.isLoggedIn]: state => state.loggedIn
};
