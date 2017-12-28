<template>
  <v-container fluid>
    <v-layout row>
      <v-flex>
        <v-btn flat color="primary">submit</v-btn>
        <v-btn flat color="primary">something else</v-btn>
        <v-btn flat color="accent" v-if="hasClose" @click.stop="closeClicked">close</v-btn>
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
      }
    }
  };
</script>
