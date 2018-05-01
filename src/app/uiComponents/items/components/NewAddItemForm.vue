<template>
  <form novalidate
        ref="incomeForm"
        v-model="formValid"
        @submit.stop.prevent="formSubmitted"
        @keyup.enter="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <base-item-fields :is-expense="isExpense" @data-changed="baseFieldsChanged"/>
        <v-expansion-panel class="elevation-0">
          <v-expansion-panel-content>
            <div slot="header">Advanced Details</div>
            <v-card>
              <advanced-details @input-triggered="advancedDetailsChanged"/>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  const ExpenseTypeFields = () => import(
    /* webpackChunkName: "addItemFormComponents" */ './ExpenseTypeFields'
    );
  const BaseItemFields = () => import(
    /* webpackChunkName: "addItemFormComponents" */ './BaseItemFields'
    );
  const AdvancedFrequencyDetails = () => import(
    /* webpackChunkName: "addItemFormComponents" */ './AdvancedFrequencyDetails'
    );
  const AdvancedDetails = () => import(
    /* webpackChunkName: "addItemFormComponents" */ './AdvancedDetails'
    );

  export default {
    components: {
      ExpenseTypeFields,
      AdvancedFrequencyDetails,
      BaseItemFields,
      AdvancedDetails
    },
    name: 'add-item-form',
    data () {
      return {
        formValid: false,
        baseFields: {
          valid: false,
          data: {}
        },
        advancedFields: {
          data: {}
        },
        newTags: [],
        advancedDetailsShown: false
      };
    },
    props: {
      isExpense: {
        type: Boolean,
        default: false
      }
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
      advancedDetailsChanged (data) {
        console.log('advanced fields changed to', data);
        this.advancedFields.data = data;
        this.emitData();
      },
      emitData () {
        console.log('emitting income form data');
        this.$emit('data-changed', {
          formValid: this.baseFields.valid,
          data: Object.assign(this.baseFields.data, this.advancedFields.data)
        });
      }
    }
  };
</script>
