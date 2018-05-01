<template>
  <form
    novalidate
    v-model="formValid"
    >
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="weight"
            label="Weight"
            hint="Enter a weight for this item"
            v-model="submissionDetails.weight"
            type="number"
            data-vv-name="weight"
            ref="weight"
            @change="inputTriggered"
            @input="inputTriggered"
            id="weight"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="manufacturer"
            label="Manufacturer"
            hint="Enter a manufacturer for this item"
            v-model="submissionDetails.manufacturer"
            type="text"
            data-vv-name="manufacturer"
            ref="manufacturer"
            @change="inputTriggered"
            @input="inputTriggered"
            id="manufacturer"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  export default {
    name: 'food-item-fields',
    data () {
      return {
        submissionDetails: {
          weight: 0,
          manufacturer: ''
        },
        formValid: false
      };
    },
    methods: {
      inputTriggered () {
        console.log('input triggered');
        this.$emit('input-triggered', { data: this.submissionDetails, valid: true });
      }
    }
  };
</script>
