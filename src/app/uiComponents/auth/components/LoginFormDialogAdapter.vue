<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Please log in or sign up to use this service</h3>
    </v-card-title>
    <email-password-form @input-triggered="inputTriggered"
                         @validity-updated="validityUpdated"
                         @has-values-updated="valuesUpdated"
                         @auth-request-type-updated="authRequestTypeUpdated"
                         ref="loginForm"/>
    <v-card-actions>
      <submit-form-button-group
        :has-close="true"
        :form-submittable="formSubmittable"
        :form-has-values="formHasValues"
        :loading="loading"
        positive-text="Submit"
        negative-text="Reset"
        @close-clicked="closeDialog"
        @submit-clicked="submitClicked"
        @reset-clicked="resetClicked"
        ref="loginButtonGroup"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
  import SubmitFormButtonGroup from '@/app/uiComponents/widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import _authBus from '../service/internalAuthBus';
  import EmailPasswordForm from './EmailPasswordForm';
  ;
  import * as firebaseAuthService from '../service/FirebaseAuthService';

  export default {
    name: 'login-form-dialog-adapter',
    data () {
      return {
        formSubmittable: false,
        formHasValues: false,
        isCreateNew: false,
        formData: {},
        loading: false
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
      async submitClicked () {
        // this.loading = true;
        console.log('submit clicked');/*
        _authBus.$emit('submit-form');*/
        if (this.formSubmittable) {
          this.loading = true;
          const result = await firebaseAuthService.loginEventTriggered(this.formData.email, this.formData.password, this.isCreateNew);
          this.loading = false;
          if (result) {
            this.closeDialog();
          }
        }
      },
      resetClicked () {
        console.log('reset clicked');
        _authBus.$emit('reset-form');
      },
      inputTriggered (data) {
        console.log(`input triggered: ${JSON.stringify(data)}`);
        this.formData = data.details;
      },
      validityUpdated (valid) {
        this.formSubmittable = valid;
      },
      valuesUpdated (hasValues) {
        this.formHasValues = hasValues;
      },
      authRequestTypeUpdated (isCreate) {
        this.isCreateNew = isCreate;
      }
    }
  };
</script>
