<template>
  <v-card class="elevation-16">
    <v-container fluid>
      <v-layout align-center column class="pb-0 mb-0 pt-0 pb-0">
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-title primary-title><h3 class="headline mb-0 pb-0 text-xs-center">Group Management</h3></v-card-title>
        </v-flex>
        <v-flex xs12 class="pb-0 mb-0 pt-0 pb-0">
          <v-card-text subtitle><p class="subheading mt-0 pt-0 text-xs-center"><em>No groups added yet</em></p></v-card-text>
        </v-flex>
        <!--<v-flex xs12>
          <v-avatar size="128px"><img :src="photoUrl" alt="profile picture"/></v-avatar>
        </v-flex>-->
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn fab color="primary" dark @click.stop="addGroup">
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-actions>
    </v-container>
    <!--<edit-user-dialog></edit-user-dialog>-->
  </v-card>
</template>
<script>
  import * as Logger from 'loglevel';
  import Bus from '@/app/events/bus';
  export default {
    name: 'group-details',
    methods: {
      addGroup () {
        Logger.debug('add group triggered');
        Bus.$emit('show_dialog', { card: 'add-group-form-dialog-adapter' });
      }
    }
  };
</script>
