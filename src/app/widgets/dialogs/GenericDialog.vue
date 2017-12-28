<template>
  <v-dialog v-model="dialogShown" :max-width="width">
    <component :is="currentCard"></component>
  </v-dialog>
</template>
<script>
  import LoginCard from '@/app/auth/components/LoginCard';
  import TermsAndConditionsCard from '@/app/auth/components/TermsAndConditionsCard';
  import Bus from '@/app/events/bus';

  export default {
    name: 'generic-dialog',
    data () {
      return {
        dialogShown: false,
        currentCard: 'terms-and-conditions-card',
        width: '700px'
      };
    },
    components: {
      LoginCard,
      TermsAndConditionsCard
    },
    mounted () {
      Bus.$on('show_dialog', params => {
        this.currentCard = params.card;
        this.width = params.width || '700px';
        this.dialogShown = true;
      });
    }
  };
</script>
