<template>
  <v-app light>
    <nav-container></nav-container>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; Joe Wemyss {{new Date().getFullYear()}}</span>
    </v-footer>
    <generic-dialog></generic-dialog>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
  import { NavContainer } from './navigation';
  import GenericDialog from './widgets/dialogs/GenericDialog';
  import { registerAuthStateListener } from './auth/service/FirebaseAuthService';
  import preferenceTypes from './store/preferences/types';
  import Snackbar from './widgets/snackbar/Snackbar';
  export default {
    components: {
      NavContainer,
      GenericDialog,
      Snackbar
    },
    async mounted () {
      registerAuthStateListener();
      await this.$store.dispatch(preferenceTypes.actions.testTrustedDevice);
    }
  };
</script>
