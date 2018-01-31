<template>
  <v-container fluid>
    <p class="headline text-xs-center">Add a new {{ctx}}</p>
    <add-finance-form
      :ctx="ctx"
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
      ref="addFinanceButtons"
    />
  </v-container>
</template>
<script>
  import AddFinanceForm from './AddFinanceForm';
  import SubmitFormButtonGroup from '../../widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import FormDialogAdapter from '@/app/uiComponents/mixins/FormDialogAdapter';
  export default{
    name: 'add-finance-form-wrapper',
    components: {
      SubmitFormButtonGroup,
      AddFinanceForm
    },
    mixins: [FormDialogAdapter],
    props: {
      ctx: String,
      loading: Boolean
    },
    methods: {
      submitClicked () {
        console.log('the submit button has been clicked');
        this.$emit('submit', this.formData);
      }
    },
    data () {
      return {
        submissionDetails: {}
      };
    }
  };
</script>
