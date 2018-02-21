<template>
  <v-container justify-center fluid>
    <v-layout column>
      <v-flex v-if="loading">
        <v-progress-circular color="primary" indeterminate/>
      </v-flex>
      <v-flex v-if="!loading">
        <v-expansion-panel expand>
          <v-expansion-panel-content :value="true">
            <div slot="header">Stats</div>
            <v-card>
              <component
                :is="statsComponent"
                :transactions="filteredTransactions"
                :shown-months="shownMonths"
                v-if="transactions.length > 0"
              />
              <v-card-title v-if="transactions.length < 1">There are no results for this period</v-card-title>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Actions</div>
            <v-card>
              <v-card-actions>
                <v-btn color="primary" @click.stop="fetchNext" :disabled="loading">Fetch more records</v-btn>
                <v-btn color="primary" @click.stop="addItemClicked" :disabled="loading" v-if="!mixed">Add new item</v-btn>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Filtering</div>
            <v-card>
              <filter-finance
                :selected-dates="transactions.map(transaction => transaction.due)"
                @shown-date-selected="shownDateUpdated"
                @shown-date-reset="shownDateReset"
                @shown-month-reset="shownMonthReset"
                @shown-month-selected="shownMonthUpdated"
              />
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import ManageFinanceSummaryStats from './ManageFinanceSummaryStats';
  import ManageMixedFinanceSummaryStats from './ManageMixedFinanceSummaryStats';
  import FilterFinance from './FilterFinance';

  export default {
    components: {
      FilterFinance,
      ManageFinanceSummaryStats,
      ManageMixedFinanceSummaryStats
    },
    name: 'manage-finance-card',
    data () {
      return {
        shownDate: '',
        shownMonth: '',
        totalTransactions: [],
        firstFetched: false,
        shownPicker: 'date'
      };
    },
    props: {
      transactions: Array,
      loading: Boolean,
      mixed: Boolean,
      shownMonths: Number
    },
    computed: {
      statsComponent () {
        return this.mixed ? 'manage-mixed-finance-summary-stats' : 'manage-finance-summary-stats';
      },
      filteredTransactions () {
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
      fetchNext () {
        this.$emit('fetch-next');
      },
      addItemClicked () {
        this.$emit('add-item');
      },
      shownMonthUpdated (newMonth) {
        this.$emit('shown-month-selected', newMonth);
      },
      shownMonthReset () {
        this.$emit('shown-month-reset');
      },
      shownDateReset () {
        this.$emit('shown-date-reset');
      },
      shownDateUpdated (newDate) {
        this.$emit('shown-date-selected', newDate);
      }
    }
  };
</script>
