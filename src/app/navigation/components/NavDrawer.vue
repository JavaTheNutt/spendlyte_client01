<template>
  <v-layout wrap>
    <v-navigation-drawer
      temporary
      v-model="shown"
      light
      absolute
    >
      <v-list class="pt-0">
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="redirect(item.path)" :id="`link-${item.title}`">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-spacer style="height: 100%"></v-spacer>
        <v-list-tile style="bottom: 0" @click="shown = !shown" id="sideNavFooter">
          <v-list-tile-content>
            <v-list-tile-title>Joe Wemyss {{new Date().getFullYear()}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>
<script>
  import NavBus from '../service/navBus';

  export default {
    name: 'navigation-drawer',
    data () {
      return {
        shown: false
      };
    },
    props: {
      items: Array
    },
    methods: {
      redirect (route) {
        this.$router.push(route);
      },
      toggleShown () {
        this.shown = !this.shown;
      }
    },
    created () {
      NavBus.$on('toggle_drawer_button_clicked', this.toggleShown);
    }
  };
</script>
