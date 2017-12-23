import router from './router';
import store from './store';

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.auth.loggedIn) return next();
    return next('/');
  }
  return next();
});
export default {
  store,
  router
};
