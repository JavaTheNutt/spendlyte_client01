<template>
  <div>
    <nav-toolbar></nav-toolbar>
    <navigation-drawer :items="navLinks"></navigation-drawer>
  </div>
</template>
<script>
  import * as navService from './navigationService';
  import NavToolbar from './NavToolbar';
  import NavigationDrawer from './NavDrawer';

  export default {
    data () {
      return {
        navLinks: []
      };
    },
    components: {
      NavigationDrawer,
      NavToolbar },
    name: 'nav-container',
    mounted () {
      this.navLinks = Object.assign({}, navService.fetchSideNavLinks());
    }
  };
</script>
