import store from '../store';

export const globalAuthGuard = (to, from, next) => {
  if (!to.meta || !to.meta.noAuth) {
    if (store.state.auth.loggedIn) return next();
    return next('/');
  }
  return next();
};
