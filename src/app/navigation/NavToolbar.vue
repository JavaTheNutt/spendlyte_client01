<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="emitClick" ref="toggleNavDrawerButton" id="toggleNavDrawerButton"></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Spend Lyte</v-toolbar-title>
    <v-spacer></v-spacer>

  </v-toolbar>
</template>
<script>
  import NavBus from './navBus';

  export default {
    name: 'nav-toolbar',
    methods: {
      emitClick () {
        NavBus.$emit('toggle_drawer_button_clicked');
      }
    }
  };
</script>
