import types from './types';

export default {
  [ types.getters.getGlobalTags ]: state => state.globalTags,
  [types.getters.getUserTags]: state => state.userTags,
  [types.getters.getTags]: state => state.globalTags.concat(state.userTags)
};
