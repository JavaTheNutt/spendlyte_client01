<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Please log in or sign up to use this service</h3>
    </v-card-title>
    <email-password-form @input-triggered="inputTriggered"/>
    <v-card-actions>
      <submit-form-button-group
        :has-close="true"
        :form-submittable="formSubmittable"
        :form-has-values="formHasValues"
        positive-text="Submit"
        negative-text="Reset"
        @close-clicked="closeDialog"
        @submit-clicked="submitClicked"
        @reset-clicked="resetClicked"/>
    </v-card-actions>
  </v-card>
</template>
<script>
  import SubmitFormButtonGroup from '@/app/widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import _authBus from '../service/internalAuthBus';
  import EmailPasswordForm from './EmailPasswordForm';

  export default {
    name: 'login-form-dialog-adapter',
    data () {
      return {
        formSubmittable: false,
        formHasValues: false,
        formData: {}
      };
    },
    components: {
      EmailPasswordForm,
      SubmitFormButtonGroup
    },
    methods: {
      closeDialog () {
        this.$emit('dialog-closed');
        _authBus.$emit('reset-form');
      },
      submitClicked () {
        console.log('submit clicked');
        _authBus.$emit('submit-form');
      },
      resetClicked () {
        console.log('reset clicked');
        _authBus.$emit('reset-form');
      },
      inputTriggered (data) {
        console.log(`input triggered: ${JSON.stringify(data)}`);
        this.formSubmittable = data.valid;
        this.formHasValues = data.hasValues;
        this.formData = data.details;
      }
    }
  };
</script>
