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
            name="transactionTitle"
            label="Title"
            :hint="`Enter a title for this ${ctx}`"
            v-model="submissionDetails.title"
            type="text"
            required
            v-validate="'required|min:3'"
            data-vv-name="title"
            :error-messages="errors.collect('title')"
            ref="transactionTitle"
            @change="inputTriggered"
            @input="inputTriggered"
            id="transactionTitle"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="transactionAmount"
            label="Amount"
            :hint="`Enter an amount for this ${ctx}`"
            v-model="submissionDetails.amount"
            type="number"
            required
            v-validate="{required: true, decimal: 2}"
            data-vv-name="amount"
            :error-messages="errors.collect('amount')"
            ref="transactionAmount"
            @change="inputTriggered"
            @input="inputTriggered"
            id="transactionAmount"
          />
        </v-flex>
        <v-flex>
          <v-select
            label="Frequency"
            :items="['Once', 'Sporadic', 'Weekly', 'Monthly', 'Daily']"
            v-model="submissionDetails.frequency"
            :hint="`Select the frequency that this ${ctx} will occur`"
            required
          />
        </v-flex>
        <v-flex>
          <v-menu
            ref="transactionDateMenu"
            lazy
            :close-on-content-click="false"
            v-model="datepickerMenu"
            :return-value.sync="submissionDetails.nextDueDate"
            full-width
            transition="scale-transition"
            >
            <v-text-field
              slot="activator"
              label="Due Date"
              :hint="`Select the next time this ${ctx} falls due`"
              prepend-icon="event"
              readonly
              v-model="submissionDetails.nextDueDate"
            />
            <v-date-picker
              v-model="submissionDetails.nextDueDate"
              no-title
              scrollable
              :min="minDate()"
            >
              <v-spacer></v-spacer>
              <v-btn flat color="accent" @click="datepickerMenu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.transactionDateMenu.save(submissionDetails.nextDueDate)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  import FormMixin from '@/app/uiComponents/mixins/Form';
  export default {
    name: 'add-finance-form',
    props: { ctx: String },
    mixins: [FormMixin],
    computed: {
      formValid () {
        return this.fields && this.fields.title && this.fields.title.dirty && this.errors.has('title');
      }
    },
    watch: {
      $route () {
        this.resetForm();
      }
    },
    data () {
      return {
        submissionDetails: {
          frequency: 'Once',
          nextDueDate: ''
        },
        datepickerMenu: false
      };
    },
    methods: {
      minDate () {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today.toISOString();
      }
    }
  };
</script>
