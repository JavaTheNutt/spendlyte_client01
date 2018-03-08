<template>
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
    <v-container fluid grid-list-xl>
      <v-data-iterator
        content-tag="v-layout"
        row
        wrap
        v-if="!loading"
        :items="items"
        :rows-per-page-items="rowsPerPageItems"
        :search="search"
      >
        <v-flex
          slot="item"
          slot-scope="props"
          :class="cardClasses"
        >
          <v-card class="elevation-9">
            <v-card-title>
              <h4>{{props.item.title | title}}</h4>
            </v-card-title>
            <v-list>
              <v-list-tile>
                <v-list-tile-title>Amount:</v-list-tile-title>
                <v-list-tile-title class="align-end">{{props.item.amount | currency}}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Next Due:</v-list-tile-title>
                <v-list-tile-title class="align-end">{{props.item.nextDueDate | long-date}}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-title>Frequency:</v-list-tile-title>
                <v-list-tile-title class="align-end">{{props.item.frequency}}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'display-finance-iterator',
    data () {
      return {
        rowsPerPageItems: [2, 4, 6, 8, { text: 'All', value: -1 }],
        search: ''
      };
    },
    props: {
      items: Array,
      mixed: Boolean,
      loading: Boolean,
      hasMultiTabs: Boolean,
      transactionType: String
    },
    computed: {
      cardClasses () {
        if (this.hasMultiTabs) return 'xs12';
        return this.items.length > 1 ? 'xs12 md6' : 'xs12';
      }
    }
  };
</script>
