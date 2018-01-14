<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">Is this a trusted device?</h3>
    </v-card-title>
    <v-card-title>
      <span>
        Is this a trusted device? If so, offline persistence can be enabled. This will allow your data to be available even when you are offline.
      </span>
      <span>
        Would you like to set this as a trusted device?
      </span>
      <br>
    </v-card-title>
    <v-card-title>
      <v-checkbox label="Don't ask again"
                  v-model="noAskTrusted"
                  color="info"
                  :value="true"
                  hide-details
                  id="askAgainTrustedCheckbox"
      />
    </v-card-title>
    <v-card-actions>
      <submit-form-button-group
        :has-close="true"
        :form-submittable="true"
        :form-has-values="true"
        :loading="loading"
        positive-text="yes"
        negative-text="no"
        close-text="cancel"
        @submit-clicked="yesClicked"
        @reset-clicked="noClicked"
        @close-clicked="closeClicked"
        ref="trustedDeviceActions"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
  import SubmitFormButtonGroup from '../forms/buttonGroups/SubmitFormButtonGroup';
  import * as Logger from 'loglevel';
  import { clientDataStore } from '@/app/localForage/init';
  import preferenceTypes from '@/app/store/preferences/types';

  export default {
    name: 'trusted-device-request-card',
    components: { SubmitFormButtonGroup },
    data () {
      return {
        loading: false,
        noAskTrusted: false
      };
    },
    methods: {
      async yesClicked () {
        Logger.info('yes clicked');
        this.loading = true;
        // await clientDataStore.trustDevice();
        await this.$store.dispatch(preferenceTypes.actions.trustDevice);
        this.loading = false;
        // fixme return to calling function
        this.$emit('revert-state');
      },
      async noClicked () {
        Logger.info('no clicked');
        this.loading = true;
        await clientDataStore.removePreference('trusted_device');
        console.log(this.noAskTrusted);
        if (this.noAskTrusted) await clientDataStore.setPreference('ask_trusted', false);
        await this.$store.dispatch(preferenceTypes.actions.testTrustedDevice);
        this.loading = false;
        this.$emit('revert-state');
      },
      closeClicked () {
        this.$emit('dialog-closed');
      }
    }
  };
</script>
