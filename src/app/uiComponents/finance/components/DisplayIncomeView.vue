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
  // import { fetchAllFutureIncomes } from '../../../data/http/finance';
  import { fetchMonthlySummary } from '../../../data/http/item';
  // import { fetchBaseIncomes } from '../financeService';
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
        nextSkip: 0,
        futureIncomes: []
      };
    },
    methods: {
      async fetchNext () {
        console.log('fetching more records skipping', this.nextSkip);
        this.loading = true;
        const result = await fetchMonthlySummary();
        this.futureIncomes = this.incomes.concat(result.data);
        this.loading = false;
        this.nextSkip++;
      }
    },
    async created () {
      console.log('view all income table created');
      this.incomes = await fetchMonthlySummary();
      this.loading = false;
    }
  };
</script>
