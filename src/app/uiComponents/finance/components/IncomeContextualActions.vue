<template>
  <v-container fluid grid-list-md style="padding: 0; margin:0">
    <v-layout row wrap>
      <v-flex xs12 class="mt-0 mb-0">
        <v-list class="pt-0 pb-0 mt-0 mb-0">
          <v-list-group
            v-model="dataViewsShown"
            class="ml-0 mr-0"
          >
            <v-list-tile slot="activator" class="mb-1">
              <v-list-tile-content>
                <v-list-tile-title>Data Views</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="mt-2 mb-2">
              <v-radio-group v-model="shownDataView" color="primary">
                <v-radio
                  label="Table View"
                  value="display-finance-table"/>
                <v-radio
                  label="Card View"
                  value="display-finance-iterator"/>
              </v-radio-group>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
      <v-flex xs12 class="mt-0 mb-0">
        <v-list  class="pt-0 pb-0 mt-0 mb-0">
          <v-list-group
            v-model="selectedCardsShown"
            class="mt-0 mb-0"
          >
            <v-list-tile class="mt-0 mb-0" slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Data Details</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="mt-0 mb-0">
              <v-checkbox label="Data" v-model="dataDetailsShown" :disabled="dataDetailsShown && lastViewActive"/>
            </v-list-tile>
            <v-list-tile class="mt-0 mb-0">
              <v-checkbox label="Stats" v-model="summaryStatsShown" :disabled="summaryStatsShown && lastViewActive"/>
            </v-list-tile>
            <v-list-tile class="mt-0 mb-0">
              <v-checkbox label="Date Filter" v-model="dateFilter" :disabled="dateFilter && lastViewActive"/>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
      <v-flex xs12 class="mt-0 mb-0">
        <v-list class="pt-0 pb-0 mt-0 mb-0">
          <v-list-group
            v-model="frequencyFiltersShown"
            class="mt-0 mb-0"
          >
            <v-list-tile class="mt-0 mb-0" slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Frequency Filters</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile class="mt-0 mb-0">
              <v-container fluid>
                <v-layout column>
                  <v-checkbox label="All" v-model="allTransactions"/>
                  <v-checkbox label="Weekly" :disabled="allTransactions" v-model="weeklyTransactionsShown"/>
                  <v-checkbox label="Monthly" :disabled="allTransactions" v-model="monthlyTransactionsShown"/>
                  <v-checkbox label="Daily" :disabled="allTransactions" v-model="dailyTransactionsShown"/>
                  <v-checkbox label="Sporadic" :disabled="allTransactions" v-model="sporadicTransactionsShown"/>
                  <v-checkbox label="Once" :disabled="allTransactions" v-model="onceTransactionsShown"/>
                </v-layout>
              </v-container>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import _financeBus from '../financeBus';

  export default {
    name: 'income-contextual-actions',
    data () {
      return {
        summaryStatsShown: false,
        dataDetailsShown: true,
        allTransactions: true,
        weeklyTransactionsShown: true,
        monthlyTransactionsShown: true,
        dailyTransactionsShown: true,
        sporadicTransactionsShown: true,
        onceTransactionsShown: true,
        shownDataView: 'display-finance-table',
        frequencyFiltersShown: false,
        dataViewsShown: true,
        selectedCardsShown: false,
        dateFilter: false
      };
    },
    computed: {
      typeFilters () {
        return [{
          name: 'Weekly',
          shown: this.weeklyTransactionsShown
        }, {
          name: 'Monthly',
          shown: this.monthlyTransactionsShown
        }, {
          name: 'Daily',
          shown: this.dailyTransactionsShown
        }, {
          name: 'Sporadic',
          shown: this.sporadicTransactionsShown
        }, {
          name: 'Once',
          shown: this.onceTransactionsShown
        }];
      },
      shownViews () {
        const shownViews = [];
        if (this.dataDetailsShown) shownViews.push('data-details');
        if (this.summaryStatsShown) shownViews.push('summary-stats');
        if (this.dateFilter) shownViews.push('date-filter');
        return shownViews;
      },
      lastViewActive () {
        return this.shownViews.length === 1;
      }
    },
    methods: {
      getShownNames () {
        return this.typeFilters.filter(elem => elem.shown === true).map(elem => elem.name);
      }
    },
    watch: {
      typeFilters () {
        console.log('type filters changed');
        _financeBus.$emit('type-filters-updated', this.getShownNames());
      },
      allTransactions (newVal) {
        this.weeklyTransactionsShown = this.dailyTransactionsShown = this.monthlyTransactionsShown = this.onceTransactionsShown = this.sporadicTransactionsShown = newVal;
      },
      summaryStatsShown (newVal) {
        if (newVal) {
          console.log('showing summary stats in income contextual actions');
          _financeBus.$emit('show-stats');
        } else {
          console.log('hiding summary stats in income contextual actions');
          _financeBus.$emit('hide-stats');
        }
      },
      dataDetailsShown (newVal) {
        if (newVal) {
          console.log('showing data details in contextual actions');
          _financeBus.$emit('show-data');
        } else {
          console.log('hiding data details in contextual actions');
          _financeBus.$emit('hide-data');
        }
      },
      dateFilter (newVal) {
        if (newVal) {
          console.log('showing date filters in contextual actions');
          _financeBus.$emit('show-date-filters');
        } else {
          console.log('hiding date filters in contextual actions');
          _financeBus.$emit('hide-date-filters');
        }
      },
      shownDataView (newVal) {
        console.log('view switch triggered');
        _financeBus.$emit('change-view', newVal);
      },
      $route () {
        Object.assign(this.$data, this.$options.data.call(this));
      }
    }
  };
</script>
