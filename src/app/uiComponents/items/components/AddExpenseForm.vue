<template>
  <form novalidate
        ref="incomeForm"
        v-model="formValid"
        @submit.stop.prevent="formSubmitted"
        @keyup.enter="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <base-item-fields :is-expense="true"/>
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
    name: 'add-expense-form',
    data () {
      return {
        formValid: false
      };
    },
    methods: {
      formSubmitted () {
        console.log('form submission event caught in add expense form');
      }
    }
  };
</script>
