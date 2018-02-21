<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md6 xs12>
        <display-finance-table
          :items="shownTransactions"
          :loading="loading"
          :transaction-type="transactionType"
          :mixed="mixed"
        />
      </v-flex>
      <v-flex md6 xs12>
        <manage-finance-card
          :loading="loading"
          :transactions="shownTransactions"
          :mixed="mixed"
          :shown-months="shownMonths"
          @fetch-next="$emit('fetch-next')"
          @add-item="$emit('add-item')"
          @shown-date-selected="shownDateUpdated"
          @shown-date-reset="shownDate = ''"
          @shown-month-reset="shownMonth = ''"
          @shown-month-selected="shownMonthUpdated"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import ManageFinanceCard from './ManageFinanceCard';
  import DisplayFinanceTable from './DisplayFinanceTable';
  export default {
    name: 'manage-finance-view',
    data () {
      return {
        shownDate: '',
        shownMonth: ''
      };
    },
    components: {
      ManageFinanceCard,
      DisplayFinanceTable
    },
    props: {
      transactions: Array,
      loading: Boolean,
      transactionType: {
        type: String,
        default: 'Transactions'
      },
      mixed: {
        type: Boolean,
        default: false
      },
      shownMonths: Number
    },
    computed: {
      shownTransactions () {
        if (this.shownDate !== '') {
          return this.transactions.filter(transaction => transaction.due === this.shownDate);
        }
        if (this.shownMonth !== '') {
          return this.transactions.filter(transaction => transaction.due.substring(0, transaction.due.lastIndexOf('-')) === this.shownMonth);
        }
        return this.transactions;
      }
    },
    methods: {
      shownMonthUpdated (newMonth) {
        console.log('filter month updated to', newMonth);
        this.shownMonth = newMonth;
        this.shownDate = '';
      },
      shownDateUpdated (newDate) {
        console.log('filter date updated to', newDate);
        this.shownDate = newDate;
        this.shownMonth = '';
      }
    }
  };
</script>
