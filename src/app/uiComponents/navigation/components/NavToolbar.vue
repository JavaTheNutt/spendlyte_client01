<template>
  <div>
    <v-toolbar dark color="primary" app clipped-right>
      <v-toolbar-side-icon @click.stop="emitClick" ref="toggleNavDrawerButton" id="toggleNavDrawerButton" v-if="hasLinks"/>
      <v-toolbar-title class="white--text">Spend Lyte</v-toolbar-title>
      <v-spacer/>
      <v-btn color="warning" @click.stop="logInClicked" v-if="!loggedIn" id="loginButton">Login</v-btn>
      <v-menu bottom left v-if="loggedIn" id="openSignOutMenu">
        <v-btn icon slot="activator" dark>
          <v-icon >more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click.stop="logOutClicked" id="clickSignOut">
            <v-list-tile-title >Sign Out</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click.stop="settingsClicked" id="clickSettings">
            <v-list-tile-title >Settings</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </div>
</template>
<script>
  import NavBus from '../service/navBus';
  import Bus from '@/app/events/bus';
  import { mapGetters, mapActions } from 'vuex';
  import { types } from '@/app';
  import { signOut } from '../../auth/service/FirebaseAuthService';
  import ContextualRightSideNav from './ContextualRightSideNav';
  import IncomeContextualActions from '@/app/uiComponents/finance/components/IncomeContextualActions';

  export default {
    components: { ContextualRightSideNav, IncomeContextualActions },
    name: 'nav-toolbar',
    computed: {
      ...mapGetters({ loggedIn: types.auth.getters.isLoggedIn })
    },
    data () {
      return {
        drawerShown: true,
        mini: true
      };
    },
    props: {
      hasLinks: Boolean,
      rightNavComponent: String
    },
    methods: {
      emitClick () {
        NavBus.$emit('toggle_drawer_button_clicked');
      },
      ...mapActions({ logIn: types.auth.actions.logIn, logOut: types.auth.actions.logOut }),
      async logOutClicked () {
        // this.logOut();
        await signOut();
      },
      settingsClicked () {
        console.log('settings clicked');
      },
      logInClicked () {
        // this.logIn();
        Bus.$emit('show_dialog', { card: 'login-form-dialog-adapter' });
      }
    }
  };
</script>
