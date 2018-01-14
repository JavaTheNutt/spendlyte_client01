<template>
  <v-dialog v-model="dialogShown" :max-width="width" ref="genericDialog" :persistent="persistent">
    <component :is="currentCard" @dialog-closed="dialogShown = false" ref="currentComponent" @cache-state="cacheState"/>
  </v-dialog>
</template>
<script>
  import Bus from '@/app/events/bus';
  // import LoginFormDialogAdapter from '@/app/auth/components/LoginFormDialogAdapter';
  const LoginFormDialogAdapter = () => import(
    /* webpackChunkName: "login-form-dialog"*/ '@/app/auth/components/LoginFormDialogAdapter'
    );
  const AddGroupFormDialogAdapter = () => import(
    /* webpackChunkName: "add-group-dialog"*/ '@/app/profile/components/AddGroupFormDialogAdapter'
    );
  const TrustedDeviceRequestCard = () => import(
    /* webpackChunkName: "trusted-device-request-card */ '@/app/widgets/info/TrustedDeviceRequestCard'
    );

  export default {
    name: 'generic-dialog',
    data () {
      return {
        dialogShown: false,
        currentCard: '',
        width: '700px',
        persistent: false,
        cachedState: {
          component: '',
          data: {}
        }
      };
    },
    watch: {
      dialogShown (newVal) {
        if (!newVal) {
          this.currentCard = '';
          this.cachedState = {
            component: '',
            data: {}
          };
        }
      }
    },
    methods: {
      cacheState (state) {
        this.cachedState.component = this.currentCard;
        this.cachedState.data = state;
      }
    },
    components: {
      LoginFormDialogAdapter,
      AddGroupFormDialogAdapter,
      TrustedDeviceRequestCard
    },
    mounted () {
      Bus.$on('show_dialog', params => {
        if (!params || !params.card) return;
        this.currentCard = params.card;
        this.width = params.width || '700px';
        this.dialogShown = true;
        this.persistent = params.persistent || false;
      });
    }
  };
</script>
