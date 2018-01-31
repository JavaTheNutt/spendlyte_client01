<template>
  <add-finance-form-wrapper ctx="income" @submit="addIncome" :loading="loading"/>
</template>
<script>
  import AddFinanceFormWrapper from './AddFinanceFormWrapper';
  import Income from '@/app/data/firestore/Income';
  export default {
    components: { AddFinanceFormWrapper },
    name: 'add-income-view',
    data () {
      return {
        loading: false
      };
    },
    methods: {
      async addIncome (data) {
        const income = new Income(
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
