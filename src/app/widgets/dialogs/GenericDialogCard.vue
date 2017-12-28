<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{title}}</h3>
    </v-card-title>
    <component :is="currentComponent"></component>
  </v-card>
</template>
<script>
  import LoginCard from '@/app/auth/components/LoginCard';
  import TermsAndConditionsCard from '@/app/auth/components/TermsAndConditionsCard';
  export default {
    name: 'generic-dialog-card',
    components: {
      LoginCard,
      TermsAndConditionsCard
    },
    props: {
      title: String,
      currentComponent: String
    }
  };
</script>
