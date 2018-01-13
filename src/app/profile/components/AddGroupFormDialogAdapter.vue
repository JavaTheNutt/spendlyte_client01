<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Please log in or sign up to use this service</h3>
    </v-card-title>
    <add-group-form ref="addGroupForm"
                    @input-triggered="inputTriggered"
                    @validity-updated="validityUpdated"
                    @has-values-updated="valuesUpdated"/>
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
  import FormDialogAdapter from '@/app/mixins/FormDialogAdapter';
  import _profileBus from '../service/profileBus';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';

  export default {
    name: 'add-group-form-dialog-adapter',
    data () {
      return {
        /* This references the local event bus that will be used for communication between the form and the buttons. Cached in
        * the component instance so that it can be called from the mixin*/
        _evb: null
      };
    },
    components: {
      SubmitFormButtonGroup,
      AddGroupForm
    },
    mixins: [FormDialogAdapter],
    created () {
      this._evb = _profileBus;
    },
    methods: {
      submitClicked () {
        Logger.info('submit clicked');
        Bus.$emit('show_dialog', { card: 'trusted-device-request-card' });
      }
    }
  };
</script>
