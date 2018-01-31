<template>
  <add-finance-form-wrapper ctx="expenditure" @submit="addExpenditure" :loading="loading"/>
</template>
<script>
  import AddFinanceFormWrapper from './AddFinanceFormWrapper';
  import Expenditure from '@/app/data/firestore/Expenditure';
  export default {
    components: { AddFinanceFormWrapper },
    name: 'add-income-view',
    data () {
      return {
        loading: false
      };
    },
    methods: {
      async addExpenditure (data) {
        const income = new Expenditure(
          data.title,
          data.amount,
          data.frequency,
          data.nextDueDate
        );
        console.log('income', income);
        this.loading = true;
        const result = await income.save();
        this.loading = false;
        console.log('result', result);
      }
    }
  };
</script>
