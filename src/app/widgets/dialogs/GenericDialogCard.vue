<template>
  <v-card>
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{title}}</h3>
    </v-card-title>
    <component :is="currentComponent"></component>
    <v-card-actions>
      <v-spacer></v-spacer>
      <component :is="currentActions"
                 :has-close="true"
                 :form-submittable="formSubmittable"
                 :form-has-values="formHasValues"
                 @close-clicked="closeDialog"
                 @submit-clicked="submitClicked"
                 @reset-clicked="resetClicked"
      ></component>
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
        formHasValues: false
      };
    },
    components: {
      LoginCard,
      SubmitFormButtonGroup,
      TermsAndConditionsCard
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
      }
    }
  };
</script>
