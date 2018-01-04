import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import * as Logger from 'loglevel';
import 'vuetify/dist/vuetify.css';

import App from './app/App';
import config from './config';
import colors from 'vuetify/es5/util/colors';

Logger.setLevel(process.env.LOG_LEVEL || 'silent');
Vue.use(VeeValidate);
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.base,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  }
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: config.router,
  store: config.store,
  render: h => h(App)
});
