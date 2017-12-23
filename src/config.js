import router from './router';
import store from './store';
import { globalAuthGuard } from './router/guards';

router.beforeEach(globalAuthGuard);
export default {
  store,
  router
};
