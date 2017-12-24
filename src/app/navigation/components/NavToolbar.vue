<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick" ref="toggleNavDrawerButton" id="toggleNavDrawerButton" v-if="hasLinks"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Spend Lyte</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="warning" @click.stop="logIn" v-if="!loggedIn" id="loginButton">Login</v-btn>
    <v-menu bottom left v-if="loggedIn" id="openSignOutMenu">
      <v-btn icon slot="activator" dark>
        <v-icon >more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click.stop="logOutClicked" id="clickSignOut">
          <v-list-tile-title >Sign Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
  import NavBus from '../service/navBus';
  import { mapGetters, mapActions } from 'vuex';
  import authTypes from '@/app/auth/vuex/types';
  export default {
    name: 'nav-toolbar',
    computed: {
      ...mapGetters({ loggedIn: authTypes.getters.isLoggedIn })
    },
    props: {
      hasLinks: Boolean
    },
    methods: {
      emitClick () {
        NavBus.$emit('toggle_drawer_button_clicked');
      },
      ...mapActions({ logIn: authTypes.actions.logIn, logOut: authTypes.actions.logOut }),
      logOutClicked () {
        this.logOut();
        this.$router.push('/');
      }
    }
  };
</script>
