import namespace from '@/app/data/store/namespace';

export default namespace('auth', {
  getters: ['isLoggedIn'],
  actions: ['logIn', 'logOut'],
  mutations: ['SET_LOGGED_IN']
});
