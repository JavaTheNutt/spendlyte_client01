import { fetchTags } from '../../firestore/Tags';
import types from './types';

export default {
  [types.actions.setTags]: async ({ commit }) => {
    const tags = (await fetchTags()).data;
    commit(types.mutations.SET_TAGS, tags);
  }
};
