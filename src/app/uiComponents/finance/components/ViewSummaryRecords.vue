<template>
  <v-card>
    <v-card-title>
      <v-btn icon flat @click.stop="shownAsTable = !shownAsTable"><v-icon>{{shownAsTable ? 'widgets' : 'view_list'}}</v-icon></v-btn>
    </v-card-title>
    <v-card-title>
      <v-checkbox label="show filters?" v-model="filterShown" color="primary" />
      <v-spacer/>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      />
    </v-card-title>
    <div v-show="filterShown">
      <v-card-title>
        <v-radio-group :row="$vuetify.breakpoint.mdAndUp" v-model="filterType">
          <v-radio label="All" value="all" color="primary"/>
          <v-radio label="Income" value="income" color="primary"/>
          <v-radio label="Expense" value="expense" color="primary"/>
        </v-radio-group>
        <v-spacer/>
        <v-radio-group :row="$vuetify.breakpoint.mdAndUp" v-model="filterPeriod">
          <v-radio label="Today" value="today" color="primary"/>
          <v-radio label="This Week" value="week" color="primary"/>
          <v-radio label="All" value="all" color="primary"/>
        </v-radio-group>
      </v-card-title>
    </div>
    <v-data-table
      :headers="listHeaders"
      :items="typeFilteredItems"
      :loading="listLoading"
      :no-data-text="listLoading ? '': 'there is no data to display'"
      :search="search"
      v-if="shownAsTable"
    >
      <v-progress-circular slot="progress" color="primary" indeterminate/>
      <template slot="items" slot-scope="props">
        <td>{{props.item.title | title}}</td>
        <td>{{props.item.amount | currency}}</td>
        <td>{{props.item.type | title}}</td>
        <td>{{props.item.date}}</td>
      </template>
    </v-data-table>
    <v-container fluid grid-list-md v-if="!shownAsTable">
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        :items="baseItems"
        :search="search"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          sm12
          md4
          v-if="props.item.dates.length > 0"
        >
          <v-card>
            <v-card-title><h4>{{props.item.title | title}}</h4></v-card-title>
            <v-divider/>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Type</v-list-tile-content>
                <v-list-tile-content class="align-end">{{props.item.type | title}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Amount Per Item</v-list-tile-content>
                <v-list-tile-content class="align-end">{{props.item.amount | currency}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Amount For Period</v-list-tile-content>
                <v-list-tile-content class="align-end">{{props.item.amount * props.item.dates.length | currency}}</v-list-tile-content>
              </v-list-tile>
              <v-divider/>
              <v-subheader class="align-center">Dates:</v-subheader>
              <v-list-tile v-for="(date, index) in props.item.dates" :key="`${date}-{index}`">
                <v-list-tile-content>{{date | long-date}}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>
<script>
  import { fetchMonthlySummaryList } from '../../../data/http/item';

  export default {
    name: 'view-summary-records',
    data () {
      return {
        listHeaders: [{
          text: 'Title',
          value: 'title'
        }, {
          text: 'Amount',
          value: 'amount'
        }, {
          text: 'Type',
          value: 'type'
        }, {
          text: 'Due',
          value: 'due'
        }],
        summaryList: {},
        baseSummaryList: [],
        listLoading: true,
        search: '',
        filterType: 'all',
        filterPeriod: 'all',
        filterShown: false,
        shownAsTable: true
      };
    },
    computed: {
      shownItems () {
        if (this.filterPeriod === 'today') return this.dailyItems;
        if (this.filterPeriod === 'week') return this.weeklyItems;
        return this.allItems;
      },
      typeFilteredItems () {
        if (this.filterType === 'expense') return this.shownItems.filter(item => item.type.toLowerCase() === 'expense');
        if (this.filterType === 'income') return this.shownItems.filter(item => item.type.toLowerCase() === 'income');
        return this.shownItems;
      },
      dailyItems () {
        if (this.listLoading) return [];
        return this.summaryList.today;
      },
      weeklyItems () {
        if (this.listLoading) return [];
        return this.summaryList.thisWeek.concat(this.summaryList.today);
      },
      allItems () {
        if (this.listLoading) return [];
        return this.weeklyItems.concat(this.summaryList.thisMonth);
      },
      baseItems () {
        if (this.listLoading) return [];
        return this.shownAsTable ? this.summaryList : this.baseSummaryList;
      }
    },
    async created () {
      const res = await fetchMonthlySummaryList(true);
      this.summaryList = res.data;
      this.baseSummaryList = res.base;
      console.log(this.baseSummaryList);
      this.listLoading = false;
    }
  };
</script>
