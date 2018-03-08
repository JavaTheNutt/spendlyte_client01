<template>
    <v-navigation-drawer
      hide-overlay
      :mini-variant="mini"
      right
      app
      clipped
      v-model="drawerShown">
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
</template>
<script>
  /* const IncomeContextualActions = import(
    /!* webpackChunkName: "contextualSideNav"*!/ '@/app/uiComponents/finance/components/IncomeContextualActions'
    );*/
  import IncomeContextualActions from '@/app/uiComponents/finance/components/IncomeContextualActions';
  export default {
    name: 'contextualRightSideNav',
    data () {
      return {
        drawerShown: true,
        mini: false,
        currentComponent: ''
      };
    },
    props: {
      component: String
    },
    components: { IncomeContextualActions }
  };
</script>
