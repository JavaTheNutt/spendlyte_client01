<template>
  <v-container fluid>
    <v-layout column>
      <v-flex>
        <v-radio-group row v-model="shownPicker">
          <v-radio label="Date" value="date" color="primary"/>
          <v-radio label="Month" value="month" color="primary"/>
        </v-radio-group>
      </v-flex>
      <hr>
      <v-flex v-show="shownPicker === 'date'">
        <v-date-picker
          v-model="shownDate"
          :allowed-dates="allowedDates"
          full-width
        />
      </v-flex>
      <v-flex v-show="shownPicker === 'month'">
        <v-date-picker
          v-model="shownMonth"
          full-width
          :allowed-dates="allowedDates"
          type="month"
        />
      </v-flex>
      <v-flex>
        <v-btn @click.stop="resetSelection" color="accent">Reset Selection</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'filter-finance',
    data () {
      return {
        shownPicker: 'date',
        shownDate: '',
        shownMonth: ''
      };
    },
    props: {
      selectedDates: Array
    },
    watch: {
      shownDate (newVal) {
        if (newVal === '') {
          console.log('shown date was reset');
          this.$emit('shown-date-reset');
        } else {
          console.log('shown date set to', newVal);
          this.$emit('shown-date-selected', newVal);
        }
      },
      shownMonth (newVal) {
        if (newVal === '') {
          console.log('shown month was reset');
          this.$emit('shown-month-reset');
        } else {
          console.log('shown month set to', newVal);
          this.$emit('shown-month-selected', newVal);
        }
      }
    },
    methods: {
      resetSelection () {
        console.log('reset selection clicked');
        this.shownDate = '';
        this.shownMonth = '';
      },
      allowedDates () {
        return this.selectedDates;
      }
    }
  };
</script>
