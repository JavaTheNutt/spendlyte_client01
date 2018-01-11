<template>
  <form novalidate
        ref="loginForm"
        @submit.stop.prevent="formSubmitted"
        @keyup.enter="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="groupName"
            label="Enter a name for this group"
            v-model="submissionDetails.name"
            type="text"
            required
            v-validate="'required|min:3'"
            data-vv-name="groupName"
            :error-messages="errors.collect('groupName')"
            ref="groupNameField"
            id="groupNameField"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="groupDescriptionField"
            label="Enter your Password"
            hint="At least 6 characters"
            v-model="submissionDetails.description"
            type="text"
            min="6"
            ref="groupDescriptionField"
            id="groupDescriptionField"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  import FormMixin from '@/app/mixins/Form';
  import _profileBus from '../service/profileBus';

  export default {
    name: 'add-group-form',
    data () {
      return {
        submissionDetails: {
          name: '',
          description: ''
        }
      };
    },
    computed: {
      formValid () {
        return this.fields.groupName.dirty && !this.errors.has('groupName');
      }
    },
    mixins: [FormMixin],
    created () {
      this._evb = _profileBus;
    }
  };
</script>
