<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{title}}</h3>
    </v-card-title>
    <component :is="currentComponent" @input-triggered="inputTriggered"></component>
    <v-card-actions>
      <!--<v-spacer></v-spacer>
      <component :is="currentActions"
                 :has-close="true"
                 :form-submittable="formSubmittable"
                 :form-has-values="formHasValues"
                 @close-clicked="closeDialog"
                 @submit-clicked="submitClicked"
                 @reset-clicked="resetClicked"
      ></component>-->
      <submit-form-button-group
        :has-close="true"
        :form-submittable="formSubmittable"
        :form-has-values="formHasValues"
        :positive-text="posText"
        :negative-text="negText"
        @close-clicked="closeDialog"
        @submit-clicked="submitClicked"
        @reset-clicked="resetClicked"></submit-form-button-group>
    </v-card-actions>
  </v-card>
</template>
<script>
  import LoginCard from '@/app/auth/components/LoginCard';
  import SubmitFormButtonGroup from '@/app/widgets/forms/buttonGroups/SubmitFormButtonGroup';
  import TermsAndConditionsCard from '@/app/auth/components/TermsAndConditionsCard';

  export default {
    name: 'generic-dialog-card',
    data () {
      return {
        formSubmittable: false,
        formHasValues: false,
        formData: {}
      };
    },
    components: {
      LoginCard,
      SubmitFormButtonGroup,
      TermsAndConditionsCard
    },
    computed: {
      isAccept () {
        return ['terms-and-conditions-card'].indexOf(this.currentComponent) !== -1;
      },
      isForm () {
        return ['login-card'].indexOf(this.currentComponent) !== -1;
      },
      posText () {
        return this.isForm ? 'submit' : 'accept';
      },
      negText () {
        return this.isAccept ? 'decline' : 'reset';
      }
    },
    props: {
      title: String,
      currentComponent: String,
      currentActions: {
        type: String,
        validator: value => ['submit-form-button-group', ''].indexOf(value) !== -1
      }
    },
    methods: {
      closeDialog () {
        this.$emit('dialog-closed');
      },
      submitClicked () {
        console.log('submit clicked');
      },
      resetClicked () {
        console.log('reset clicked');
      },
      inputTriggered (data) {
        console.log(`input triggered: ${JSON.stringify(data)}`);
        this.formSubmittable = data.valid;
        this.formHasValues = data.hasValues;
        this.formData = data.details;
      }
    }
  };
</script>
