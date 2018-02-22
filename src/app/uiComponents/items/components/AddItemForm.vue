<template>
  <form novalidate
        ref="loginForm"
        v-model="formValid"
        @submit.stop.prevent="formSubmitted"
        @keyup.enter="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="title"
            label="Title"
            hint="Enter a title for this item"
            v-model="submissionDetails.title"
            type="text"
            required
            v-validate="'required|min:3'"
            data-vv-name="title"
            :error-messages="errors.collect('title')"
            ref="title"
            @change="inputTriggered"
            @input="inputTriggered"
            id="title"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="supplier"
            label="Supplier"
            hint="Enter the item supplier"
            v-model="submissionDetails.supplier"
            type="text"
            required
            v-validate="'required|min:3'"
            data-vv-name="supplier"
            :error-messages="errors.collect('supplier')"
            ref="supplier"
            @change="inputTriggered"
            @input="inputTriggered"
            id="supplier"
          />
        </v-flex>
        <v-flex>
          <v-select
            label="Type"
            :items="['Food', 'Household', 'Clothing', 'Cleaning', 'Personal Care', 'Other']"
            v-model="submissionDetails.type"
            hint="Select what type of item this is"
            required
          />
        </v-flex>
        <v-flex v-if="submissionDetails.type === 'Food'">
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
        <v-flex v-if="submissionDetails.type === 'Food'">
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
        <v-flex>
          <v-text-field
            name="amount"
            label="Amount"
            hint="Enter an amount for this item"
            v-model="submissionDetails.amount"
            type="number"
            required
            v-validate="{required: true, decimal: 2}"
            data-vv-name="amount"
            :error-messages="errors.collect('amount')"
            ref="amount"
            @change="inputTriggered"
            @input="inputTriggered"
            id="amount"
          />
        </v-flex>
        <v-flex>
          <v-select
            label="Frequency"
            :items="['Once', 'Sporadic', 'Weekly', 'Monthly', 'Daily']"
            v-model="submissionDetails.frequency"
            hint="Select the frequency that this item will be purchased"
            required
          />
        </v-flex>
        <v-flex v-if="submissionDetails.frequency === 'Sporadic' || submissionDetails.frequency === 'Once'">
          <v-menu
            ref="itemDateMenu"
            lazy
            :close-on-content-click="false"
            v-model="datepickerMenu"
            :return-value.sync="submissionDetails.due"
            full-width
            transition="scale-transition"
          >
            <v-text-field
              slot="activator"
              label="Due Date"
              hint="Select when this purchase will be made"
              prepend-icon="event"
              readonly
              v-model="submissionDetails.due"
            />
            <v-date-picker
              v-model="submissionDetails.due"
              no-title
              scrollable
              :min="minDate()"
            >
              <v-spacer/>
              <v-btn flat color="accent" @click="datepickerMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.itemDateMenu.save(submissionDetails.due)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex v-if="submissionDetails.frequency === 'Monthly'">
          <v-select
            label="Due at"
            :items="['Start', 'Middle', 'End']"
            v-model="submissionDetails.monthlyDueInterval"
            hint="Select when this item will be purchased each month"
            required
          />
        </v-flex>
        <v-flex v-if="submissionDetails.frequency === 'Weekly'">
          <v-select
            label="Due on"
            :items="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
            v-model="submissionDetails.weekDayDue"
            hint="Select when this item will be purchased each month"
            required
          />
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  import Bus from '../bus';
  import FormMixin from '@/app/uiComponents/mixins/Form';
  export default {
    name: 'add-item-form',
    mixins: [FormMixin],
    data () {
      return {
        submissionDetails: {
          title: '',
          supplier: '',
          frequency: 'Daily',
          due: '',
          amount: 0,
          monthlyDueInterval: 'Start',
          weekDayDue: 'Monday',
          type: 'Food',
          weight: 0,
          manufacturer: ''
        },
        datepickerMenu: false
      };
    },
    computed: {
      formValid () {
        return this.submissionDetails.title.length > 0 && this.submissionDetails.supplier.length > 0 && this.submissionDetails.amount > 0;
      },
      baseSubmittableDetails () {
        return {
          title: this.submissionDetails.title,
          supplier: this.submissionDetails.supplier,
          frequency: this.submissionDetails.frequency,
          amount: this.submissionDetails.amount
        };
      },
      sporadicSubmittableDetails () {
        return Object.assign({ due: this.submissionDetails.due }, this.baseSubmittableDetails);
      },
      weeklySubmittableDetails () {
        return Object.assign({ weekDayDue: this.submissionDetails.weekDayDue }, this.baseSubmittableDetails);
      },
      monthlySubmittableDetails () {
        return Object.assign({ monthlyDueInterval: this.submissionDetails.monthlyDueInterval }, this.baseSubmittableDetails);
      },
      currentSubmittableDetails () {
        if (this.submissionDetails.frequency === 'Weekly') return this.weeklySubmittableDetails;
        if (this.submissionDetails.frequency === 'Monthly') return this.monthlySubmittableDetails;
        return this.sporadicSubmittableDetails;
      }
    },
    methods: {
      minDate () {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today.toISOString();
      }
    },
    created () {
      this._evb = Bus;
    }
  };
</script>
