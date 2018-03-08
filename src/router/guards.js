import store from '../store';
import Bus from '@/app/events/bus';

export const globalAuthGuard = (to, from, next) => {
  Bus.$emit('reset-sidenav');
  if (!to.meta || !to.meta.noAuth) {
    if (store.state.auth.loggedIn) return next();
    return next('/');
  }
  return next();
};
