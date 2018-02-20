<template>
  <div>
    <v-card>
      <v-card-title>
        <h3 class="headline mb-0">{{transactionType}}</h3>
        <v-spacer/>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          hide-details
          v-model="search"/>
      </v-card-title>
      <v-data-table
        :headers="shownHeaders"
        :items="shownItems"
        :loading="loading"
        :no-data-text="noDataText"
        :search="search"
      >
        <v-progress-circular slot="progress" color="primary" indeterminate />
        <template slot="items" slot-scope="props">
          <td>{{props.item.title}}</td>
          <td v-if="mixed">{{props.item.type}}</td>
          <td>{{props.item.amount | currency}}</td>
          <td>{{props.item.frequency}}</td>
          <td>{{props.item.due}}</td>
          <td class="text-xs-center px-0">
            <v-btn icon class="mx-0">
              <v-icon color="error">delete_forever</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'display-finance-table',
    data () {
      return {
        search: '',
        headers: [{
          text: 'Title',
          value: 'title'
        }, {
          text: 'Amount',
          value: 'amount'
        }, {
          text: 'Frequency',
          value: 'frequency'
        }, {
          text: 'Due On',
          value: 'due'
        }],
        mixedHeaders: [{
          text: 'Title',
          value: 'title'
        }, {
          text: 'Type',
          value: 'type'
        }, {
          text: 'Amount',
          value: 'amount'
        }, {
          text: 'Frequency',
          value: 'frequency'
        }, {
          text: 'Due On',
          value: 'due'
        }]
      };
    },
    props: {
      items: Array,
      loading: Boolean,
      transactionType: {
        type: String,
        default: 'Transactions'
      },
      mixed: Boolean
    },
    computed: {
      noDataText () {
        return this.loading ? '' : 'You have no transactions for this period';
      },
      shownItems () {
        return this.loading ? [] : this.items;
      },
      shownHeaders () {
        return this.mixed ? this.mixedHeaders : this.headers;
      }
    }
  };
</script>
