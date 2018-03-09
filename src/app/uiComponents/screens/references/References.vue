<template>
  <v-card>
    <v-card-title>
      <h3 class="headline mb-0">References</h3>
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
        :items="items"
        :search="search"
        :rows-per-page-items="rowsPerPageItems"
      >
        <v-flex slot="item" slot-scope="props" class="xs12 md4">
          <single-reference-card
            :item="props.item"
            />
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>
<script>
  import referenceData from './references';
  import SingleReferenceCard from './SingleReferenceCard';
  export default {
    components: { SingleReferenceCard },
    name: 'references',
    data () {
      return {
        items: [],
        search: '',
        rowsPerPageItems: [3, 6, 9, { text: 'All', value: -1 }]
      };
    },
    created () {
      this.items = referenceData;
    }
  };
</script>
