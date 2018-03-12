<template>
  <v-snackbar
    app
    :timeout="0"
    bottom
    right
    v-model="cookieWarningShown"
    multi-line
  >
    <v-icon dark class="mr-5">warning</v-icon> We use cookies to give you the best performance on this site. By using this site, you agree to the use of cookies. <v-btn icon @click.stop="closeClicked"><v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>
<script>
  import { preferenceDataStore } from '@/app/data/localForage/PreferenceDataStore';
  import { mapGetters } from 'vuex';
  import types from '@/app/data/store/preferences/types';
  export default {
    name: 'cookie-warning',
    data () {
      return {
        cookieWarningShown: true
      };
    },
    computed: {
      ...mapGetters({ trustedDevice: types.getters.isTrustedDevice })
    },
    methods: {
      async closeClicked () {
        console.log('close clicked in cookie warning');
        this.cookieWarningShown = false;
        if (this.trustedDevice) await preferenceDataStore.setShowCookieWarning();
      }
    },
    created () {
      console.log(types);
    }
  };
</script>
