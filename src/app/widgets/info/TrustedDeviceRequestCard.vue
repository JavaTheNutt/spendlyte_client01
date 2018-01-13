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
    </v-card-title>
    <v-card-actions>
      <submit-form-button-group
        :has-close="false"
        :form-submittable="true"
        :form-has-values="true"
        :loading="loading"
        positive-text="Yes"
        negative-text="No"
        @submit-clicked="yesClicked"
        @reset-clicked="noClicked"
        ref="trustedDeviceActions"
      />
    </v-card-actions>
  </v-card>
</template>
<script>
  import SubmitFormButtonGroup from '../forms/buttonGroups/SubmitFormButtonGroup';
  import * as Logger from 'loglevel';
// eslint-disable-next-line no-unused-vars
  import { clientDataStore } from '@/app/localForage/init';
  import preferenceTypes from '@/app/store/preferences/types';

  export default {
    name: 'trusted-device-request-card',
    components: { SubmitFormButtonGroup },
    data () {
      return {
        loading: false
      };
    },
    methods: {
      async yesClicked () {
        Logger.info('yes clicked');
        this.loading = true;
        await clientDataStore.setPreference('trusted_device', true);
        await this.$store.dispatch(preferenceTypes.actions.testTrustedDevice);
        this.loading = false;
        this.$emit('dialog-closed');
      },
      async noClicked () {
        Logger.info('no clicked');
        this.loading = true;
        await clientDataStore.removePreference('trusted_device');
        await this.$store.dispatch(preferenceTypes.actions.testTrustedDevice);
        this.loading = false;
        this.$emit('dialog-closed');
      }
    }
  };
</script>
