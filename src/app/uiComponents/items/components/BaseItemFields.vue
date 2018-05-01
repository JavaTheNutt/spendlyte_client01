<template>
  <div>
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
          :hint="`Select the next time this item falls due`"
          prepend-icon="event"
          readonly
          v-model="submissionDetails.nextDueDate"
        />
        <v-date-picker
          v-model="submissionDetails.nextDueDate"
          no-title
          scrollable
        >
          <v-spacer/>
          <v-btn flat color="accent" @click="datepickerMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.transactionDateMenu.save(submissionDetails.nextDueDate)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex>
      <choose-tags @tags-updated="tagValueChanged"/>
    </v-flex>
  </div>
</template>
<script>
  import ChooseTags from '@/app/uiComponents/widgets/chooseTags/ChooseTags';
  import _itemBus from '../bus';
  export default {
    name: 'base-item-fields',
    components: { ChooseTags },
    data () {
      return {
        submissionDetails: {
          title: '',
          amount: 0.00,
          tags: [],
          nextDueDate: ''
        },
        newTags: [],
        datepickerMenu: false
      };
    },
    props: {
      isExpense: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      'submissionDetails.nextDueDate' () {
        console.log('due date changed');
        this.inputTriggered();
      }
    },
    methods: {
      inputTriggered () {
        console.log('input triggered in base fields');
        this.$emit('data-changed', {
          formValid: !!this.submissionDetails.title && !!this.submissionDetails.nextDueDate,
          data: Object.assign({}, this.submissionDetails)
        });
      },
      tagValueChanged (tagData) {
        console.log('tag value changed', tagData);
        this.submissionDetails.tags = tagData.selected || [];
        this.newTags = tagData.new || [];
        this.inputTriggered();
      },
      clearFormData () {
        return new Promise(resolve => {
          Object.assign(this.$data, this.$options.data.call(this));
          this.$nextTick().then(() => resolve());
        });
      },
      resetForm () {
        return new Promise(resolve => {
          this.clearFormData().then(() => {
            this.$nextTick().then(() => {
              this.$validator.reset();
              this.errors.clear();
              resolve();
            });
          });
        });
      }
    },
    created () {
      _itemBus.$on('reset-fields', () => {
        this.resetForm();
      });
    }
  };
</script>
