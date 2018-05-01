<template>
  <div>
    <v-flex>
      <v-checkbox
        v-model="isRecurring"
        color="primary"
        label="recurring?"
        @change="inputTriggered"
      />
    </v-flex>
    <div v-if="isRecurring">
      <v-tabs class="elevation-0" v-model="activeFrequency" @input="inputTriggered">
        <v-tabs-slider color="primary"/>
        <v-tab>Monthly</v-tab>
        <v-tab>Weekly</v-tab>
        <v-tab>Daily</v-tab>
        <v-tab-item>
          <monthly-frequency-details @input-triggered="frequencyDetailsChanged"/>
        </v-tab-item>
        <v-tab-item>
          <v-flex>
            <v-select
              label="Due on"
              :items="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
              v-model="submissionDetails.freq01"
              hint="Select which day of the week this item will occur"
              required
            />
          </v-flex>
        </v-tab-item>
      </v-tabs>
      <v-text-field
        v-model="recurrenceInterval"
        type="number"
        data-vv-name="recurrenceInterval"
        :hint="intervalMessage"
        persistent-hint
        v-validate="{numeric: true, min_value: 1, max_value: 100}"
        :error-messages="errors.collect('recurrenceInterval')"
      />
    </div>
  </div>
</template>
<script>
  const MonthlyFrequencyDetails = () => import(
    /* webpackChunkName: "addItemFormAdvancedComponents" */ './MonthlyFrequencyDetails'
    );
  import _itemBus from '../bus';
  export default {
    name: 'advanced-frequency-details',
    components: { MonthlyFrequencyDetails },
    data () {
      return {
        submissionDetails: {
          frequencyType: 'int',
          freq01: 'Start',
          freq02: 'Monday'
        },
        formValid: false,
        isRecurring: false,
        activeFrequency: 0,
        recurrenceInterval: 1
      };
    },
    watch: {
      activeFrequency (newVal) {
        switch (newVal) {
        case '0':
          this.submissionDetails = {
            frequencyType: 'int',
            freq01: 'Start',
            freq02: 'Monday'
          };
          break;
        case '1':
          this.submissionDetails = {
            frequencyType: 'diw',
            freq01: 'Monday',
            freq02: 'Monday'
          };
          break;
        case '2':
          this.submissionDetails = {
            frequencyType: 'dai',
            freq01: '',
            freq02: ''
          };
          break;
        }
      }
    },
    computed: {
      frequency () {
        switch (this.activeFrequency) {
        case '0':
          return 'Monthly';
        case '1':
          return 'Weekly';
        case '2':
          return 'Daily';
        default:
          return 'Monthly';
        }
      },
      intervalMessage () {
        switch (this.submissionDetails.frequencyType) {
        case 'int':
        case 'dim':
        case 'wdim':
          return 'Select how often this should occur. For example, if it should happen every second month, set this to "2"';
        case 'diw':
          return 'Select how often this should occurr. For example, if it should happen every two weeks, set this to "2"';
        case 'dai':
          return 'Select how often this should occur. For example, if it should happen every second day, set this to "2"';
        default:
          return 'Select how often this should occur.';
        }
      }
    },
    methods: {
      inputTriggered () {
        console.log('input triggered in advanced frequency details. emitting ', Object.assign({ isRecurring: this.isRecurring, frequency: this.frequency }, this.submissionDetails));
        this.$emit('input-triggered', { data: Object.assign({ isRecurring: this.isRecurring, frequency: this.frequency, interval: this.recurrenceInterval }, this.submissionDetails), valid: true });
      },
      frequencyDetailsChanged (data) {
        console.log('freqency details change detected in advanced frequency details component');
        this.submissionDetails = data;
        this.inputTriggered();
      },
      clearFormData () {
        return new Promise(resolve => {
          Object.assign(this.$data, this.$options.data.call(this));
          this.$nextTick().then(() => resolve());
        });
      }
    },
    created () {
      _itemBus.$on('reset-fields', () => {
        this.clearFormData();
      });
    }
  };
</script>
