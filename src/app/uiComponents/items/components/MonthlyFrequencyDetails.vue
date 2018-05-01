<template>
  <div>
    <v-flex>
      <v-radio-group row v-model="frequencyType">
        <v-radio
          label="Interval"
          value="int"
          color="primary"
        />
        <v-radio
          label="Day in Month"
          value="dim"
          color="primary"
        />
        <v-radio
          label="Weekday in Month"
          value="wdim"
          color="primary"
        />
      </v-radio-group>
    </v-flex>
    <v-flex v-if="submissionDetails.frequencyType === 'int'">
      <v-select
        :items="['Start', 'Middle', 'End']"
        v-model="submissionDetails.freq01"
        hint="Select roughly when this item will occur"
        persistent-hint
        required
        @change="inputTriggered"
      />
    </v-flex>
    <v-flex v-if="submissionDetails.frequencyType === 'dim'">
      <v-select
        :items="['1', '2','3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28']"
        v-model="submissionDetails.freq01"
        hint="Select the date when this item will occur each month"
        persistent-hint
        required
        @change="inputTriggered"
      />
    </v-flex>
    <div v-if="submissionDetails.frequencyType === 'wdim'">
      <v-flex>
        <v-select
          :items="['First', 'Second', 'Third', 'Last']"
          v-model="submissionDetails.freq01"
          hint="Select select which week in the month this item will occur"
          persistent-hint
          required
          @change="inputTriggered"
        />
      </v-flex>
      <v-flex>
        <v-select
          :items="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
          v-model="submissionDetails.freq02"
          hint="Select which day of the week this item will occur"
          persistent-hint
          required
          @change="inputTriggered"
        />
      </v-flex>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'monthly-frequency-details',
    data () {
      return {
        submissionDetails: {
          frequencyType: 'int',
          freq01: 'Start',
          freq02: 'Monday'
        },
        frequencyType: 'int'
      };
    },
    methods: {
      inputTriggered () {
        this.$nextTick(() => {
          console.log('monthly details input triggered. Data:', this.submissionDetails);
          this.$emit('input-triggered', this.submissionDetails);
        });
      }
    },
    watch: {
      frequencyType (newVal) {
        console.log('frequencyType watcher triggered with value', newVal);
        switch (newVal) {
        case 'int':
          this.submissionDetails.freq01 = 'Start';
          this.submissionDetails.freq02 = '';
          this.submissionDetails.frequencyType = newVal;
          break;
        case 'dim':
          this.submissionDetails.freq01 = '1';
          this.submissionDetails.freq02 = '';
          this.submissionDetails.frequencyType = newVal;
          break;
        case 'wdim':
          this.submissionDetails.freq01 = 'First';
          this.submissionDetails.freq02 = 'Monday';
          this.submissionDetails.frequencyType = newVal;
          break;
        }
        this.inputTriggered();
      }
    }
  };
</script>
