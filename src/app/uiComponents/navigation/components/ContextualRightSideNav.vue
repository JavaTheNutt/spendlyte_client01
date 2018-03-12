<template>
    <div v-resize="onResize">
        <v-navigation-drawer
          hide-overlay
          :mini-variant="mini"
          right
          app
          clipped
          v-model="drawerShown"
          v-if="largeScreen"
        >
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-action>
                  <v-btn icon @click.stop="mini = !mini">
                    <v-icon>{{mini ? 'settings' : 'chevron_right'}}</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <v-divider/>
          <component :is="component" v-show="!mini"/>
        </v-navigation-drawer>
        <v-navigation-drawer
          hide-overlay
          right
          app
          temporary
          v-model="drawerShown"
          v-if="!largeScreen"
        >
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile>
                <v-list-tile-action>
                  <v-btn icon @click.stop="drawerShown = false">
                    <v-icon>chevron_right</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-toolbar>
          <component :is="component"/>
        </v-navigation-drawer>
    </div>
</template>
<script>
  /* const IncomeContextualActions = import(
    /!* webpackChunkName: "contextualSideNav"*!/ '@/app/uiComponents/finance/components/IncomeContextualActions'
    );*/
  import Bus from '@/app/events/bus';
  import IncomeContextualActions from '@/app/uiComponents/finance/components/IncomeContextualActions';
  export default {
    name: 'contextualRightSideNav',
    data () {
      return {
        drawerShown: true,
        mini: true,
        currentComponent: '',
        largeScreen: false
      };
    },
    methods: {
      onResize () {
        console.log('resize event triggered in side nav', this.$vuetify.breakpoint);
        this.largeScreen = this.$vuetify.breakpoint.lgAndUp;
        this.drawerShown = this.largeScreen;
        this.mini = false;
      }
    },
    props: {
      component: String
    },
    components: { IncomeContextualActions },
    created () {
      Bus.$on('contextual-side-nav-toggled', () => {
        this.drawerShown = !this.drawerShown;
      });
    },
    mounted () {
      this.onResize();
    }
  };
</script>
