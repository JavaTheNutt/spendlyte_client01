<template>
  <v-dialog v-model="dialogShown" :max-width="width">
    <generic-dialog-card :title="title" :current-component="currentCard" style="height: 100%;"></generic-dialog-card>
  </v-dialog>
</template>
<script>
  import Bus from '@/app/events/bus';
  import GenericDialogCard from './GenericDialogCard';
  export default {
    name: 'generic-dialog',
    data () {
      return {
        dialogShown: false,
        currentCard: 'terms-and-conditions-card',
        width: '700px',
        title: 'I am a dialog'
      };
    },
    components: {
      GenericDialogCard
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
