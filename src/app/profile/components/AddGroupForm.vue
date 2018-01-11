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
            v-model="groupDetails.name"
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
            v-model="groupDetails.password"
            type="text"
            min="6"
            v-validate="'min:6'"
            data-vv-name="groupDescription"
            :error-messages="errors.collect('groupDescription')"
            ref="password"
            id="groupDescriptionField"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>
<script>
  export default {
    name: 'add-group-form',
    data () {
      return {
        groupDetails: {
          name: '',
          description: ''
        }
      };
    }
  };
</script>
