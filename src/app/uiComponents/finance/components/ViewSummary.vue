<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Monthly Summary</v-card-title>
      <v-data-table
        :headers="tableHeaders"
        hide-actions
        :items="summary"
        :loading="loading"
        :no-data-text="loading ? '': 'there is no data to display'"
      >
        <v-progress-circular slot="progress" color="primary" indeterminate/>
        <template slot="items" slot-scope="props">
          <td>{{props.item.name | title}}</td>
          <td>{{props.item.income | currency}}</td>
          <td>{{props.item.incomeCount}}</td>
          <td>{{props.item.expense | currency}}</td>
          <td>{{props.item.expenseCount}}</td>
          <td>{{props.item.income - props.item.expense | currency}}</td>
        </template>
      </v-data-table>
    </v-card>
    <v-layout>
      <v-flex class="text-xs-center my-2">
        <v-btn color="primary" @click.stop="toggleList">{{listShown ? 'Hide': 'Show'}} Records</v-btn>
      </v-flex>
    </v-layout>
    <div v-if="listFetched" v-show="listShown">
      <view-summary-records></view-summary-records>
    </div>
  </v-container>
</template>
<script>
  import { fetchMonthlySummary } from '../../../data/http/item';
  import ViewSummaryRecords from './ViewSummaryRecords';

  export default {
    name: 'view-summary',
    components: { ViewSummaryRecords },
    data () {
      return {
        summary: [],
        tableHeaders: [{
          text: 'Interval',
          value: 'interval'
        }, {
          text: 'Income Total',
          value: 'incomeTotal'
        }, {
          text: 'Income Count',
          value: 'incomeCount'
        }, {
          text: 'Expense Total',
          value: 'expenseTotal'
        }, {
          text: 'Expense Count',
          value: 'expenseCount'
        }, {
          text: 'Balance',
          value: 'balance'
        }],
        loading: true,
        listFetched: false,
        listShown: false
      };
    },
    methods: {
      toggleList () {
        if (!this.listFetched) this.listFetched = true;
        this.listShown = !this.listShown;
      }
    },
    async created () {
      this.summary = await fetchMonthlySummary();
      this.loading = false;
      console.log('breakpoint', this.$vuetify.breakpoint);
    }
  };
</script>
