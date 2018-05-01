import namespace from '../namespace';

export default namespace('autocomplete', {
  getters: ['getGlobalTags', 'getUserTags', 'getTags'],
  actions: ['setTags'],
  mutations: ['SET_GLOBAL_TAGS', 'SET_USER_TAGS', 'SET_TAGS', 'ADD_USER_TAG', 'ADD_USER_TAGS']
});
