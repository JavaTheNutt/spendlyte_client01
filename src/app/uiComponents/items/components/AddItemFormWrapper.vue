<template>
  <v-container fluid>
    <p class="headline text-xs-center">Add a new item</p>
    <v-layout v-if="!typeSet">
      <v-flex xs6 offset-xs4>
        <v-radio-group row v-model="shownType">
          <v-radio
            label="Income"
            value="income"
            color="success"
          />
          <v-radio
            label="Expense"
            value="expenditure"
            color="error"
          />
        </v-radio-group>
      </v-flex>
    </v-layout>
    <add-item-form
      @input-triggered="inputTriggered"
      @validity-updated="validityUpdated"
      @has-values-updated="valuesUpdated"
      @data-changed="dataChanged"
      :is-expense="isExpense"
    />
    <submit-form-button-group
      align="center"
      :has-close="false"
      :form-submittable="formSubmittable"
      :form-has-values="formHasValues"
      :loading="loading"
      positive-text="Submit"
      negative-text="Reset"
      @submit-clicked="submitClicked"
      @reset-clicked="resetClicked"
      ref="addItemButtons"
    />
    <v-dialog
      v-model="dialogShown" max-width="500">
      <v-card>
        <v-card-title class="headline">Would you like to add another record?</v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="success" @click.stop="addNewItem">Add another record</v-btn>
          <v-btn color="primary" @click.stop="redirectToSummary">Show monthly summary</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
  import _itemBus from '../bus';
  import AddItemForm from './NewAddItemForm';
  import SubmitFormButtonGroup from '../../widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import FormDialogAdapter from '@/app/uiComponents/mixins/FormDialogAdapter';
  import { addItem } from '../../../data/http/item';

  export default {
    data () {
      return {
        typeSet: false,
        shownType: 'income',
        newTags: [],
        dialogShown: false
      };
    },
    components: {
      SubmitFormButtonGroup,
      AddItemForm
    },
    mixins: [FormDialogAdapter],
    watch: {
      $route () {
        this.setShownType();
      }
    },
    name: 'add-item-form-wrapper',
    methods: {
      async submitClicked () {
        console.log('the submit button has been clicked');
        this.$emit('submit', this.formData);
        this.loading = true;
        if (this.formSubmittable) await addItem(Object.assign({ isIncome: this.shownType === 'income' }, this.formData));
        this.dialogShown = true;
        this.loading = false;
      },
      dataChanged ({ data = {}, formValid = false, newTags = [] }) {
        this.formSubmittable = formValid;
        this.formData = data;
        this.newTags = newTags;
      },
      redirectToSummary () {
        this.$router.push('/summary');
      },
      addNewItem () {
        _itemBus.$emit('reset-fields');
        this.dialogShown = false;
      },
      setShownType () {
        this.typeSet = !!this.$route.query.type;
        this.shownType = this.typeSet ? this.$route.query.type : this.shownType || 'income';
      }
    },
    computed: {
      isExpense () {
        return this.shownType === 'expenditure';
      }
    },
    created () {
      this._evb = _itemBus;
      this.setShownType();
    }
  };
</script>
