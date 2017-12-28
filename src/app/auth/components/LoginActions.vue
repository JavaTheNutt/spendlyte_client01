<template>
  <v-container fluid>
    <v-layout row wrap align-right>
      <v-flex class="text-xs-right">
        <v-btn color="primary" @click="submitClicked">submit</v-btn>
        <v-btn color="accent" @click="resetClicked">reset</v-btn>
        <v-btn flat color="primary" v-if="hasClose" @click.stop="closeClicked">close</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'login-actions',
    props: {
      hasClose: Boolean
    },
    methods: {
      closeClicked () {
        this.$emit('close-clicked');
      },
      submitClicked () {
        this.$emit('submit-clicked');
      },
      resetClicked () {
        this.$emit('reset-clicked');
      }
    }
  };
</script>
