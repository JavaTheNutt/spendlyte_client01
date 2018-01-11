<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Please log in or sign up to use this service</h3>
    </v-card-title>
    <add-group-form ref="addGroupForm"/>
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
        ref="addGroupButtons"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
  import SubmitFormButtonGroup from '@/app/widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import AddGroupForm from './AddGroupForm';

  export default {
    name: 'add-group-form-dialog-adapter',
    components: {
      SubmitFormButtonGroup,
      AddGroupForm
    }
  };
</script>
