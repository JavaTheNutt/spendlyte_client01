import types from './types';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import state from './state';

export default {
  store: {
    state,
    getters,
    actions,
    mutations
  },
  types
};
