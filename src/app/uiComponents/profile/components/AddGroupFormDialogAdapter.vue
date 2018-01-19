<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Please log in or sign up to use this service</h3>
    </v-card-title>
    <add-group-form ref="addGroupForm"
                    :initial-data="formData"
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
  import SubmitFormButtonGroup from '@/app/uiComponents/widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import AddGroupForm from './AddGroupForm';
  import FormDialogAdapter from '@/app/uiComponents/mixins/FormDialogAdapter';
  import _profileBus from '../service/profileBus';
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';
  import { mapGetters } from 'vuex';
  import preferenceTypes from '@/app/data/store/preferences/types';

  export default {
    name: 'add-group-form-dialog-adapter',
    data () {
      return {
        /* This references the local event bus that will be used for communication between the form and the buttons. Cached in
        * the component instance so that it can be called from the mixin*/
        _evb: null
      };
    },
    computed: {
      ...mapGetters({ askTrusted: preferenceTypes.getters.doAskTrusted })
    },
    components: {
      SubmitFormButtonGroup,
      AddGroupForm
    },
    mixins: [FormDialogAdapter],
    created () {
      this._evb = _profileBus;
      if (this.initData && this.initData !== {}) {
        Logger.info('loading add group form with', this.initData);
        this.formData = Object.assign({}, this.initData);
      }
    },
    props: {
      initData: Object
    },
    methods: {
      submitClicked () {
        Logger.info('submit clicked');
        if (this.askTrusted) {
          this.cacheValues();
          Bus.$emit('show_dialog', {
            card: 'trusted-device-request-card',
            persistent: true
          });
        } else {
          Logger.info('device is trusted, or user does not wish to be asked');
        }
      }
    }
  };
</script>
