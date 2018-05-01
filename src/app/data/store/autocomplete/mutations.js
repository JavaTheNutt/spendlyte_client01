import types from './types';

export default {
  [types.mutations.SET_GLOBAL_TAGS]: (state, globalTags) => state.globalTags = globalTags,
  [types.mutations.SET_USER_TAGS]: (state, userTags) => state.userTags = userTags,
  [types.mutations.ADD_USER_TAGS]: (state, userTags) => {
    userTags.forEach(tag => {
      if (state.userTags.indexOf(tag) === -1) state.userTags.push(tag);
    });
  },
  [types.mutations.ADD_USER_TAG]: (state, userTag) => {
    if (state.userTags.indexOf(userTag) === -1) state.userTags.push(userTag);
  },
  [types.mutations.SET_TAGS]: (state, { global, user }) => {
    state.globalTags = global;
    state.userTags = user;
  }
};
