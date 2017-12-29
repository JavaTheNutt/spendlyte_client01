<template>
  <v-dialog v-model="dialogShown" :max-width="width">
    <generic-dialog-card :title="title" :current-component="currentCard" :current-actions="currentActions" style="height: 100%;" @dialog-closed="dialogShown = false"></generic-dialog-card>
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
        currentCard: '',
        currentActions: '',
        width: '700px',
        title: ''
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
        this.currentActions = this.fetchActions(params.card);
        this.dialogShown = true;
      });
    },
    methods: {
      fetchActions (componentName) {
        return 'submit-form-button-group';
      }
    }
  };
</script>
