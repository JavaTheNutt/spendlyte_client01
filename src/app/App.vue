<template>
  <v-app light>
    <nav-container></nav-container>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { NavContainer } from './navigation';
  export default {
    components: { NavContainer }
  };
</script>
