import types from './types';

export default {
  [types.actions.logIn]: ({ commit }) => commit(types.mutations.SET_LOGGED_IN, true),
  [types.actions.logOut]: ({ commit }) => commit(types.mutations.SET_LOGGED_IN, false)
};
