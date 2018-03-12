<template>
  <v-app light>
    <nav-container/>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; Joe Wemyss {{new Date().getFullYear()}}</span>
      <v-spacer />
      <router-link to="/references" style="color: grey; text-decoration: none" class="mr-3">references</router-link>
    </v-footer>
    <generic-dialog/>
    <snackbar/>
    <cookie-warning v-if="showCookieWarning"/>
  </v-app>
</template>

<script>
  import { NavContainer } from './uiComponents/navigation';
  import GenericDialog from './uiComponents/widgets/dialogs/GenericDialog';
  import { registerAuthStateListener } from './uiComponents/auth/service/FirebaseAuthService';
  import { enableFirestorePersistence } from './data/firestore/init';
  import { types } from './index';
  import Snackbar from './uiComponents/widgets/snackbar/Snackbar';
  import CookieWarning from './uiComponents/widgets/cookieWarning/CookieWarning';

  export default {
    data () {
      return {
        showCookieWarning: false
      };
    },
    components: {
      CookieWarning,
      NavContainer,
      GenericDialog,
      Snackbar
    },
    async mounted () {
      console.log('main app mounted');
      registerAuthStateListener();
      await this.$store.dispatch(types.preferences.actions.testTrustedDevice);
      console.log('trusted device?', this.$store.getters[types.preferences.getters.isTrustedDevice]);
      this.showCookieWarning = this.$store.getters[types.preferences.getters.shouldAskCookies];
      console.log('show cookie warning?', this.showCookieWarning);
      if (this.$store.getters[types.preferences.getters.isTrustedDevice]) await enableFirestorePersistence();
    }
  };
</script>
