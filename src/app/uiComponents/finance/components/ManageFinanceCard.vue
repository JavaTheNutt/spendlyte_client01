<template>
  <v-card>
    <v-container v-if="transactions.length === 0">
      <v-progress-circular color="primary" indeterminate/>
    </v-container>
  <v-container v-if="transactions.length !== 0">
    <v-layout column>
      <v-flex>
        <v-data-table
          hide-headers
          hide-actions
          :items="mixed ? mixedStats : stats"
        >
          <template slot="items" slot-scope="props">
            <td><strong>{{props.item.title}}</strong></td>
            <td v-if="props.item.format === 'currency'">{{props.item.value | currency}}</td>
            <td v-if="props.item.format === 'date'">{{props.item.value | long-date}}</td>
            <td v-if="props.item.format === 'basic'">{{props.item.value}}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex>
        <v-card-actions>
          <v-btn color="primary" @click.stop="fetchNext" :disabled="loading">Fetch more records</v-btn>
          <v-btn color="primary" @click.stop="addItemClicked" :disabled="loading" v-if="!mixed">Add new item</v-btn>
          <v-btn color="primary" @click.stop="advancedOptionsShown = !advancedOptionsShown" :disabled="loading" v-if="!mixed">{{advancedLabel}} advanced options</v-btn>
        </v-card-actions>
      </v-flex>
      <v-flex v-if="advancedOptionsShown">
        <v-container>
          <v-layout>
            <v-flex>
              advanced options go here
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'manage-finance-card',
    data () {
      return {
        advancedOptionsShown: false
      };
    },
    props: {
      transactions: Array,
      loading: Boolean,
      mixed: Boolean,
      shownMonths: Number
    },
    computed: {
      advancedLabel () {
        return this.advancedOptionsShown ? 'Hide' : 'Show';
      },
      cumulativeVisibleValue () {
        return this.amountList.reduce((acc, income) => acc + income, 0);
      },
      incomeTotal () {
        if (!this.mixed) return this.cumulativeVisibleValue;
        return this.allIncomes
        .map(transaction => +transaction.amount)
        .reduce((acc, income) => acc + income, 0);
      },
      expenditureTotal () {
        if (!this.mixed) return this.cumulativeVisibleValue;
        return this.allExpenditures
        .map(transaction => +transaction.amount)
        .reduce((acc, income) => acc + income, 0);
      },
      allIncomes () {
        if (!this.mixed) return this.transactions;
        return this.transactions
        .filter(transaction => transaction.type === 'Income');
      },
      allExpenditures () {
        if (!this.mixed) return this.transactions;
        return this.transactions
        .filter(transaction => transaction.type === 'Expenditure');
      },
      dateList () {
        return this.transactions.map(transaction => transaction.due);
      },
      firstDate () {
        return this.dateList[0];
      },
      lastDate () {
        return this.dateList[this.dateList.length - 1];
      },
      meanVisibleValue () {
        return this.cumulativeVisibleValue / this.transactions.length;
      },
      amountList () {
        return this.transactions.map(transaction => +transaction.amount);
      },
      stats () {
        return [{
          title: 'Months Shown',
          value: this.shownMonths,
          format: 'basic'
        }, {
          title: 'Total',
          value: this.cumulativeVisibleValue,
          format: 'currency'
        }, {
          title: 'Average',
          value: this.meanVisibleValue,
          format: 'currency'
        }, {
          title: 'Next Due',
          value: this.firstDate,
          format: 'date'
        }, {
          title: 'Last Due',
          value: this.lastDate,
          format: 'date'
        }];
      },
      mixedStats () {
        return [{
          title: 'Months Shown',
          value: this.shownMonths,
          format: 'basic'
        }, {
          title: 'Income Total',
          value: this.incomeTotal,
          format: 'currency'
        }, {
          title: 'Expenditure Total',
          value: this.expenditureTotal,
          format: 'currency'
        }, {
          title: 'Balance',
          value: this.incomeTotal - this.expenditureTotal,
          format: 'currency'
        }, {
          title: 'Average Income',
          value: this.incomeTotal / this.allIncomes.length,
          format: 'currency'
        }, {
          title: 'Average Expenditure',
          value: this.expenditureTotal / this.allExpenditures.length,
          format: 'currency'
        }, {
          title: 'Next Due',
          value: this.firstDate,
          format: 'date'
        }, {
          title: 'Last Due',
          value: this.lastDate,
          format: 'date'
        }];
      }
    },
    methods: {
      fetchNext () {
        this.$emit('fetch-next');
      },
      addItemClicked () {
        this.$emit('add-item');
      }
    }
  };
</script>
