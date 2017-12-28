<template>
  <v-dialog v-model="dialogShown" max-width="700px" :is="currentCard">
    <component :is="currentCard"></component>
  </v-dialog>
</template>
<script>
  import LoginCard from '@/app/auth/components/LoginCard';
  import TermsAndConditionsCard from '@/app/auth/components/TermsAndConditionsCard';

  export default {
    name: 'generic-dialog',
    data () {
      return {
        dialogShown: false,
        currentCard: 'terms-and-conditions-card'
      };
    },
    components: {
      LoginCard,
      TermsAndConditionsCard
    }
  };
</script>
