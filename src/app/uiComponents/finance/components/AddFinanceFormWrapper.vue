<template>
  <v-container fluid>
    <add-finance-form :ctx="ctx"/>
    <submit-form-button-group align="center"/>
  </v-container>
</template>
<script>
  import AddFinanceForm from './AddFinanceForm';
  import SubmitFormButtonGroup from '../../widgets/forms/buttonGroups/SubmitFormButtonGroup';
  export default{
    name: 'add-finance-form-wrapper',
    components: {
      SubmitFormButtonGroup,
      AddFinanceForm
    },
    computed: {
      ctx () {
        return this.$route.path.substring(1, this.$route.path.lastIndexOf('/'));
      }
    }
  };
</script>
