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
    name: 'manage-finance-summary-stats',
    props: {
      transactions: Array,
      shownMonths: Number
    },
    computed: {
      amountList () {
        return this.transactions.map(transaction => +transaction.amount);
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
      }
    }
  };
</script>
