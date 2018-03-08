<template>
  <manage-finance-view
    :transactions="expenditures"
    transaction-type="Expenditures"
    :loading="loading"
    @fetch-next="fetchNext"
    :shown-months="nextSkip"
    @add-item="$router.push('/expenditure/new')"
  />
</template>
<script>
  import { fetchAllFutureExpenditures } from '../../../data/http/finance';
  import { fetchBaseExpenditures } from '../financeService';
  import ManageFinanceView from './ManageFinanceView';

  export default {
    components: {
      ManageFinanceView
    },
    name: 'display-expenditure-view',
    data () {
      return {
        expenditures: [],
        loading: true,
        nextSkip: 0
      };
    },
    methods: {
      async fetchNext () {
        console.log('fetching more records skipping', this.nextSkip);
        this.loading = true;
        const result = await fetchAllFutureExpenditures(1, this.nextSkip);
        this.expenditures = this.expenditures.concat(result.data);
        this.loading = false;
        this.nextSkip++;
      }
    },
    async created () {
      console.log('view all expenditure table created');
      this.expenditures = await fetchBaseExpenditures();
      this.loading = false;
    }
  };
</script>
