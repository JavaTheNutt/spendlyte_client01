<template>
  <div>
    <v-toolbar
      fixed
      scroll-off-screen
      scroll-threshold="180"
      class="white mt-5 pt-2"
      v-if="showSettingsButton"
    >
      <v-spacer/>
      <v-btn icon @click.stop="toggleContextualSideNav"><v-icon>settings</v-icon></v-btn>
    </v-toolbar>
    <v-container fluid grid-list-md :class="showSettingsButton ? 'mt-5 pt-2':'mt-1 pt-1'">
      <v-layout row wrap>
        <v-flex :class="tabClasses" v-if="dataShown">
          <component
            :is="dataView"
            :items="shownTransactions"
            :loading="loading"
            :transaction-type="transactionType"
            :mixed="mixed"
            :has-multi-tabs="moreThanOneTabShown"
          />
        </v-flex>
        <v-flex :class="tabClasses" v-if="statsShown">
          <v-card>
            <manage-finance-summary-stats
              :loading="loading"
              :transactions="shownTransactions"
              :shown-months="shownMonths"
            />
          </v-card>
        </v-flex>
        <v-flex :class="tabClasses" v-if="dateFiltersShown">
          <v-card>
            <filter-finance
              :selected-dates="shownTransactions.map(transaction => transaction.nextDueDate)"
              @shown-date-selected="shownDateUpdated"
              @shown-date-reset="shownDate = ''"
              @shown-month-selected="shownMonthUpdated"
              @shown-month-reset="shownMonth = ''"
            />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import ManageFinanceCard from './ManageFinanceCard';
  import DisplayFinanceTable from './DisplayFinanceTable';
  import DisplayFinanceIterator from './DisplayFinanceIterator';
  import _financeBus from '../financeBus';
  import ManageFinanceSummaryStats from './ManageFinanceSummaryStats';
  import FilterFinance from './FilterFinance';
  import Bus from '@/app/events/bus';
  export default {
    name: 'manage-finance-view',
    data () {
      return {
        shownDate: '',
        shownMonth: '',
        statsShown: false,
        dataShown: true,
        dateFiltersShown: false,
        dataView: 'display-finance-table',
        shownTypes: ['Weekly', 'Monthly', 'Daily', 'Sporadic', 'Once'],
        shownTabsNum: 1
      };
    },
    components: {
      FilterFinance,
      ManageFinanceSummaryStats,
      ManageFinanceCard,
      DisplayFinanceTable,
      DisplayFinanceIterator
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
          return this.typeFilteredTransactions.filter(transaction => transaction.nextDueDate === this.shownDate);
        }
        if (this.shownMonth !== '') {
          return this.typeFilteredTransactions.filter(transaction => transaction.nextDueDate.substring(0, transaction.nextDueDate.lastIndexOf('-')) === this.shownMonth);
        }
        return this.typeFilteredTransactions;
      },
      moreThanOneTabShown () {
        return this.shownTabsNum > 1;
      },
      tabClasses () {
        return this.moreThanOneTabShown ? 'md6 xs12' : 'xs12';
      },
      typeFilteredTransactions () {
        return this.transactions.filter(transaction => this.shownTypes.indexOf(transaction.frequency) !== -1);
      },
      showSettingsButton () {
        return this.$vuetify.breakpoint.mdAndDown;
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
      },
      toggleContextualSideNav () {
        Bus.$emit('contextual-side-nav-toggled');
      }
    },
    created () {
      _financeBus.$on('show-stats', () => {
        this.statsShown = true;
        this.shownTabsNum++;
      });
      _financeBus.$on('hide-stats', () => {
        this.statsShown = false;
        this.shownTabsNum--;
      });
      _financeBus.$on('show-data', () => {
        this.dataShown = true;
        this.shownTabsNum++;
      });
      _financeBus.$on('hide-data', () => {
        this.dataShown = false;
        this.shownTabsNum--;
      });
      _financeBus.$on('show-date-filters', () => {
        this.dateFiltersShown = true;
        this.shownTabsNum++;
      });
      _financeBus.$on('hide-date-filters', () => {
        this.dateFiltersShown = false;
        this.shownTabsNum--;
      });
      _financeBus.$on('change-view', newView => {
        this.dataView = newView;
      });
      _financeBus.$on('type-filters-updated', shownFrequencies => {
        this.shownTypes = shownFrequencies;
      });
    },
    mounted () {
      Bus.$emit('set-sidenav', { name: 'income-contextual-actions' });
    }
  };
</script>
