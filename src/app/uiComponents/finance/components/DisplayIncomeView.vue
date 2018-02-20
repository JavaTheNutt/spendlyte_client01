<template>
  <manage-finance-view
    :transactions="incomes"
    transaction-type="Incomes"
    :loading="loading"
    :shown-months="nextSkip"
    @fetch-next="fetchNext"
    @add-item="$router.push('/income/new')"
  />
</template>
<script>
  import { fetchAllFutureIncomes } from '../../../data/http/finance';
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
        const result = await fetchAllFutureIncomes(1, this.nextSkip);
        this.incomes = this.incomes.concat(result.data);
        this.loading = false;
        this.nextSkip++;
      }
    },
    async created () {
      console.log('view all income table created');
      const incomes = await fetchAllFutureIncomes();
      this.loading = false;
      console.log('fetched incomes', incomes);
      this.incomes = incomes.data;
      this.nextSkip++;
    }
  };
</script>
