<template>
  <div>
    <nav-toolbar></nav-toolbar>
    <navigation-drawer :items="navLinks"></navigation-drawer>
  </div>
</template>
<script>
  import * as navService from '../service/navigationService';
  import NavToolbar from './NavToolbar';
  import NavigationDrawer from './NavDrawer';
  import { mapGetters } from 'vuex';
  import authTypes from '@/app/auth/vuex/types';

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
    computed: {
      ...mapGetters({ loggedIn: authTypes.getters.isLoggedIn })
    },
    watch: {
      '$route' () {
        this.refreshNavLinks();
      },
      loggedIn () {
        this.refreshNavLinks();
      }
    },
    methods: {
      refreshNavLinks () {
        this.navLinks = Object.assign([], navService.fetchSideNavLinks());
      }
    },
    mounted () {
      this.refreshNavLinks();
    }
  };
</script>
