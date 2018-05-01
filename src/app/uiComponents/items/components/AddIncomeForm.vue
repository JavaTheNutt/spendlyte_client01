<template>
  <form novalidate
        ref="incomeForm"
        v-model="formValid"
        @submit.stop.prevent="formSubmitted"
        @keyup.enter="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <base-item-fields :is-expense="false" @data-changed="baseFieldsChanged"/>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  const BaseItemFields = () => import(
    /* webpackChunkName: "addItemFormComponents" */ './BaseItemFields'
    );

  export default {
    components: { BaseItemFields },
    name: 'add-income-form',
    data () {
      return {
        formValid: false,
        baseFields: {
          valid: false,
          data: {}
        },
        newTags: []
      };
    },
    methods: {
      formSubmitted () {
        console.log('form submission event caught in add income form');
      },
      baseFieldsChanged ({ formValid = false, data = {}, newTags = [] }) {
        console.log('base field values changed', data);
        this.baseFields.valid = formValid;
        this.baseFields.data = data;
        this.newTags = newTags;
        this.emitData();
      },
      emitData () {
        console.log('emitting income form data');
        this.$emit('data-changed', {
          formValid: this.baseFields.valid,
          data: this.baseFields.data,
          newTags: this.newTags
        });
      }
    }
  };
</script>
