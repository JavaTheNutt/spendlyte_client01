<template>
  <v-container fluid>
    <v-layout row wrap :class="currentAlign">
      <v-flex v-if="!loading">
        <v-btn color="primary" @click="submitClicked" :disabled="!formSubmittable" ref="positiveButton" id="submitButton">{{positiveText}}</v-btn>
        <v-btn color="accent" @click="resetClicked" :disabled="!formHasValues" ref="negativeButton" id="resetButton">{{negativeText}}</v-btn>
        <v-btn flat color="primary" v-if="hasClose" @click.stop="closeClicked" ref="closeButton" id="closeButton">{{closeText}}</v-btn>
      </v-flex>
      <v-flex v-if="loading" class="text-xs-right" ref="loadingContainer">
        <v-progress-circular indeterminate color="primary"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'submit-form-button-group',
    props: {
      hasClose: Boolean,
      formSubmittable: Boolean,
      formHasValues: Boolean,
      positiveText: {
        type: String,
        default: 'submit'
      },
      negativeText: {
        type: String,
        default: 'reset'
      },
      closeText: {
        type: String,
        default: 'close'
      },
      loading: {
        type: Boolean,
        default: false
      },
      align: {
        type: String,
        default: 'right'
      }
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
    },
    computed: {
      currentAlign () {
        return `text-xs-${this.align}`;
      }
    }
  };
</script>
