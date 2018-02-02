<template>
  <div>
    <nav-toolbar :hasLinks="hasLinks"/>
    <navigation-drawer :items="navLinks"/>
  </div>
</template>
<script>
  import * as navService from '../service/navigationService';
  import NavToolbar from './NavToolbar';
  import NavigationDrawer from './NavDrawer';
  import { mapGetters } from 'vuex';
  import { types } from '@/app';
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
      ...mapGetters({ loggedIn: types.auth.getters.isLoggedIn }),
      hasLinks () {
        return this.navLinks.length > 0;
      }
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
