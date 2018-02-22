<template>
  <v-container fluid>
    <p class="headline text-xs-center">Add a new item</p>
    <add-item-form
      @input-triggered="inputTriggered"
      @validity-updated="validityUpdated"
      @has-values-updated="valuesUpdated"
    />
    <submit-form-button-group
      align="center"
      :has-close="false"
      :form-submittable="formSubmittable"
      :form-has-values="formHasValues"
      :loading="loading"
      positive-text="Submit"
      negative-text="Reset"
      @submit-clicked="submitClicked"
      @reset-clicked="resetClicked"
      ref="addItemButtons"
    />
  </v-container>
</template>
<script>
  import _itemBus from '../bus';
  import AddItemForm from './AddItemForm';
  import SubmitFormButtonGroup from '../../widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import FormDialogAdapter from '@/app/uiComponents/mixins/FormDialogAdapter';

  export default {
    components: {
      SubmitFormButtonGroup,
      AddItemForm
    },
    mixins: [FormDialogAdapter],
    name: 'add-item-form-wrapper',
    methods: {
      submitClicked () {
        console.log('the submit button has been clicked');
        this.$emit('submit', this.formData);
      }
    },
    created () {
      this._evb = _itemBus;
    }
  };
</script>
