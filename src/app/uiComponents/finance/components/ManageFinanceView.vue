<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex md6 xs12>
        <display-finance-table
          :items="transactions"
          :loading="loading"
          :transaction-type="transactionType"
          :mixed="mixed"
        />
      </v-flex>
      <v-flex md6 xs12>
        <manage-finance-card
          :loading="loading"
          :transactions="transactions"
          :mixed="mixed"
          :shown-months="shownMonths"
          @fetch-next="$emit('fetch-next')"
          @add-item="$emit('add-item')"
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
    }
  };
</script>
