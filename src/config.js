import router from './router';
import store from './store';
import { sync } from 'vuex-router-sync';
import { globalAuthGuard } from './router/guards';

sync(store, router, { moduleName: 'router_store' });
router.beforeEach(globalAuthGuard);
export default {
  store,
  router
};
