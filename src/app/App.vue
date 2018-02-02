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
  import { NavContainer } from './uiComponents/navigation';
  import GenericDialog from './uiComponents/widgets/dialogs/GenericDialog';
  import { registerAuthStateListener } from './uiComponents/auth/service/FirebaseAuthService';
  import { enableFirestorePersistence } from './data/firestore/init';
  import { types } from './index';
  import Snackbar from './uiComponents/widgets/snackbar/Snackbar';
  export default {
    components: {
      NavContainer,
      GenericDialog,
      Snackbar
    },
    async mounted () {
      console.log('main app mounted');
      registerAuthStateListener();
      await this.$store.dispatch(types.preferences.actions.testTrustedDevice);
      console.log('trusted device?', this.$store.getters[types.preferences.getters.isTrustedDevice]);
      if (this.$store.getters[types.preferences.getters.isTrustedDevice]) await enableFirestorePersistence();
    }
  };
</script>
