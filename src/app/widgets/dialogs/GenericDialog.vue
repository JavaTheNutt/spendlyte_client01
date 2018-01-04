<template>
  <v-dialog v-model="dialogShown" :max-width="width" ref="genericDialog">
    <component :is="currentCard" @dialog-closed="dialogShown = false" ref="currentComponent"/>
  </v-dialog>
</template>
<script>
  import Bus from '@/app/events/bus';
  import LoginFormDialogAdapter from '@/app/auth/components/LoginFormDialogAdapter';

  export default {
    name: 'generic-dialog',
    data () {
      return {
        dialogShown: false,
        currentCard: '',
        width: '700px'
      };
    },
    components: {
      LoginFormDialogAdapter
    },
    mounted () {
      Bus.$on('show_dialog', params => {
        if (!params || !params.card) return;
        this.currentCard = params.card;
        this.width = params.width || '700px';
        this.dialogShown = true;
      });
    }
  };
</script>
