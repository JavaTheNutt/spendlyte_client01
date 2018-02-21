<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-data-table
          hide-headers
          hide-actions
          :items="stats"
        >
          <template slot="items" slot-scope="props">
            <td><strong>{{props.item.title}}</strong></td>
            <td v-if="props.item.format === 'currency'">{{props.item.value | currency}}</td>
            <td v-if="props.item.format === 'date'">{{props.item.value | long-date}}</td>
            <td v-if="props.item.format === 'basic'">{{props.item.value}}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'manage-mixed-finance-summary-stats',
    props: {
      transactions: Array,
      shownMonths: Number
    },
    computed: {
      amountList () {
        return this.transactions.map(transaction => +transaction.amount);
      },
      allIncomes () {
        return this.transactions
        .filter(transaction => transaction.type === 'Income');
      },
      allExpenditures () {
        return this.transactions
        .filter(transaction => transaction.type === 'Expenditure');
      },
      incomeTotal () {
        return this.allIncomes
        .map(transaction => +transaction.amount)
        .reduce((acc, income) => acc + income, 0);
      },
      expenditureTotal () {
        return this.allExpenditures
        .map(transaction => +transaction.amount)
        .reduce((acc, income) => acc + income, 0);
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
      cumulativeVisibleValue () {
        return this.amountList.reduce((acc, income) => acc + income, 0);
      },
      meanVisibleValue () {
        return this.cumulativeVisibleValue / this.transactions.length;
      },
      stats () {
        return [{
          title: 'Months Fetched',
          value: this.shownMonths,
          format: 'basic'
        }, {
          title: 'Records Shown',
          value: this.transactions.length,
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
    }
  };
</script>
