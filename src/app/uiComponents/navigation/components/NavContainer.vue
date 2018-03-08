<template>
  <div>
    <nav-toolbar :hasLinks="hasLinks"/>
    <contextual-right-side-nav v-if="currentRightNav.length > 0" :component="currentRightNav"/>
    <navigation-drawer :items="navLinks"/>
  </div>
</template>
<script>
  import * as navService from '../service/navigationService';
  import NavToolbar from './NavToolbar';
  import NavigationDrawer from './NavDrawer';
  import { mapGetters } from 'vuex';
  import { types } from '@/app';
  import ContextualRightSideNav from './ContextualRightSideNav';
  import Bus from '@/app/events/bus';
  export default {
    data () {
      return {
        navLinks: [],
        currentRightNav: ''
      };
    },
    components: {
      ContextualRightSideNav,
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
    },
    created () {
      Bus.$on('set-sidenav', props => {
        console.log('adding', props.name, 'component to contextual navigation');
        this.currentRightNav = props.name;
      });
      Bus.$on('reset-sidenav', () => {
        console.log('removing contextual navigation');
        this.currentRightNav = '';
      });
    }
  };
</script>
