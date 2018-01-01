<template>
  <v-dialog v-model="dialogShown" :max-width="width">
    <component :is="currentCard" @dialog-closed="dialogShown = false"/>
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
        currentActions: '',
        width: '700px',
        title: ''
      };
    },
    components: {
      LoginFormDialogAdapter
    },
    mounted () {
      Bus.$on('show_dialog', params => {
        this.currentCard = params.card;
        this.title = params.title || 'I am a dialog';
        this.width = params.width || '700px';
        this.dialogShown = true;
      });
    }
  };
</script>
