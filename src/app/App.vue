<template>
  <v-app light>
    <nav-container></nav-container>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
    <generic-dialog></generic-dialog>
  </v-app>
</template>

<script>
  import { NavContainer } from './navigation';
  import GenericDialog from './widgets/dialogs/GenericDialog';

  export default {
    components: { NavContainer, GenericDialog }
  };
</script>
