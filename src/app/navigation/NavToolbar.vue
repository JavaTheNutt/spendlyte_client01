<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Spend Lyte</v-toolbar-title>
    <v-spacer></v-spacer>
    <!--<v-btn color="warning" @click.stop="loginClicked" v-if="!loggedIn" name="loginButton">Login</v-btn>-->
    <!-- <v-menu bottom left v-if="loggedIn">
	   <v-btn icon slot="activator" dark>
		 <v-icon id="openSignOutMenu">more_vert</v-icon>
	   </v-btn>
	   <v-list>
		 <v-list-tile @click.stop="signOutClicked">
		   <v-list-tile-title id="clickSignOut">Sign Out</v-list-tile-title>
		 </v-list-tile>
	   </v-list>
	 </v-menu>-->
    <!--<v-avatar v-if="loggedIn"><img :src="photoUrl" alt="profile picture"/> </v-avatar>-->
  </v-toolbar>
</template>
<script>
  export default {
    name: 'nav-toolbar'
  };
</script>
