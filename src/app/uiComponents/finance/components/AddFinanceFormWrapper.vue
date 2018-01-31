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
  import Income from '@/app/data/firestore/Income';
  export default{
    name: 'add-finance-form-wrapper',
    components: {
      SubmitFormButtonGroup,
      AddFinanceForm
    },
    mixins: [FormDialogAdapter],
    computed: {
      ctx () {
        return this.$route.path.substring(1, this.$route.path.lastIndexOf('/'));
      }
    },
    methods: {
      async submitClicked () {
        console.log('the submit button has been clicked');
        if (this.ctx === 'income') {
          const income = new Income(
            this.formData.title,
            this.formData.amount,
            this.formData.frequency,
            this.formData.nextDueDate
          );
          console.log('income', income);
          this.loading = true;
          const result = await income.save();
          this.loading = false;
          console.log('result', result);
        }
      }
    },
    data () {
      return {
        submissionDetails: {}
      };
    }
  };
</script>
