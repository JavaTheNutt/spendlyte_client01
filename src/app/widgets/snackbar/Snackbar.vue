<template>
  <v-snackbar
    :timeout="timeout"
    bottom
    v-model="snackbarShown"
  >{{message}}
    <v-btn flat :color="status === 'success' ? 'success':'accent'" @click.stop="snackbarShown = false" ref="closeSnackbarButton">Close</v-btn>
  </v-snackbar>
</template>
<script>
  import Bus from '@/app/events/bus';
  import * as Logger from 'loglevel';

  export default {
    name: 'snackbar',
    data () {
      return {
        snackbarShown: false,
        timeout: 4000,
        bottom: true,
        message: '',
        status: 'success'
      };
    },
    created () {
      Bus.$on('show-snack', (msg, status) => this.showSnack(msg, status));
    },
    methods: {
      showSnack (msg, status) {
        Logger.info(`show snack message received. showing "${msg}"`);
        this.message = msg;
        this.status = status || 'success';
        this.snackbarShown = true;
      }
    }
  };
</script>
