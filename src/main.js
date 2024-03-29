import Vue from 'vue';
import Vuetify from 'vuetify';
import VueCurrencyFilter from 'vue-currency-filter';
import VeeValidate from 'vee-validate';
import firebase from 'firebase/app';
import 'vuetify/dist/vuetify.css';
import { longDateFilter, titleCaseString } from './filters';
import App from './app/App';
import config from './config';
import colors from 'vuetify/es5/util/colors';

console.log('setting log level in app bootstrap');
const logLevel = process.env.LOG_LEVEL || 'silent';
console.log('current log level ', logLevel);

// logLevel === 'silent' ? console.disableAll() : console.enableAll();
if (logLevel === 'silent') console.log = () => {};
// console.setLevel(process.env.LOG_LEVEL || 'silent');
Vue.use(VeeValidate);

Vue.use(VueCurrencyFilter, {
  symbol: '€',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true
});
Vue.filter('long-date', longDateFilter);
Vue.filter('title', titleCaseString);
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

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: config.router,
  store: config.store,
  render: h => h(App)
});
