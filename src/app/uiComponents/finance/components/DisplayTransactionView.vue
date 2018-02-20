<template>
  <manage-finance-view
    :transactions="incomes"
    :loading="loading"
    @fetch-next="fetchNext"
    :mixed="true"
    :shown-months="nextSkip"
  />
</template>
<script>
  import { fetchAllFutureTransactions } from '../../../data/http/finance';
  import ManageFinanceView from './ManageFinanceView';

  export default {
    components: {
      ManageFinanceView
    },
    name: 'display-income-view',
    data () {
      return {
        incomes: [],
        loading: true,
        nextSkip: 0
      };
    },
    methods: {
      async fetchNext () {
        console.log('fetching more records skipping', this.nextSkip);
        this.loading = true;
        const result = await fetchAllFutureTransactions(1, this.nextSkip);
        this.incomes = this.incomes.concat(result.data);
        this.loading = false;
        this.nextSkip++;
      }
    },
    async created () {
      console.log('view all income table created');
      const incomes = await fetchAllFutureTransactions();
      this.loading = false;
      console.log('fetched incomes', incomes);
      this.incomes = incomes.data;
      this.nextSkip++;
    }
  };
</script>
