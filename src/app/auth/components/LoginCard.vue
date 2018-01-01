<template>
  <form novalidate ref="loginForm" v-model="formValid" @submit.prevent="formSubmitted">
    <v-container grid-list-md text-xs-center>
      <v-layout column>
        <v-flex>
          <v-text-field
            name="emailField"
            label="Enter your email address"
            v-model="submissionDetails.email"
            type="email"
            required
            v-validate="'required|email'"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            ref="emailField"
            @change="inputTriggered"
            @input="inputTriggered"
          />
        </v-flex>
        <v-flex>
          <v-text-field
            name="passwordField"
            label="Enter your Password"
            hint="At least 6 characters"
            v-model="submissionDetails.password"
            :type="passwordShown ? 'text' : 'password'"
            min="6"
            required
            :append-icon="passwordShown ? 'visibility_off': 'visibility'"
            :append-icon-cb="()=>(passwordShown = !passwordShown)"
            v-validate="'required|min:6'"
            data-vv-name="password"
            :error-messages="errors.collect('password')"
            ref="password"
            @change="inputTriggered"
            @input="inputTriggered"
          />
        </v-flex>
        <!--<v-flex v-show="createAccountTicked">
          <v-text-field
            name="confirmPasswordField"
            label="Confirm your Password"
            hint="At least 6 characters"
            v-model="confirmPassword"
            :type="passwordShown ? 'text' : 'password'"
            min="6"
            required
            :append-icon="passwordShown ? 'visibility_off': 'visibility'"
            :append-icon-cb="()=>(passwordShown = !passwordShown)"
            v-validate="'required|confirmed:$password'"
            data-vv-name="confirmPassword"
            :error-messages="errors.collect('confirmPassword')"></v-text-field>
        </v-flex>
        <v-flex>
          <v-checkbox label="Create new account?"
                      v-model="createAccountTicked"
                      color="info"
                      value="yes"
                      hide-details
                      id="createNewAccountCheckbox"
          ></v-checkbox>

        </v-flex>-->
      </v-layout>
      <!--<v-layout row>
        <v-flex v-if="loading">
          <v-progress-circular indeterminate color="primary" ></v-progress-circular>
        </v-flex>
        <v-flex v-if="!loading">
          <v-btn :disabled="!formValid"  color="warning" class="white&#45;&#45;text" @click.stop="logIn" name="submitPasswordLoginDetails">Log In</v-btn>
        </v-flex>
      </v-layout>-->
      <!--<v-layout v-if="hasError">
        <v-flex>
          <p>{{errorMessage}}</p>
        </v-flex>
      </v-layout>-->
    </v-container>
  </form>
</template>
<script>
  import DialogBus from '../../widgets/dialogs/DialogBus';

  export default {
    name: 'login-card',
    data () {
      return {
        submissionDetails: {
          email: '',
          password: ''
        },
        confirmPassword: '',
        passwordShown: false,
        createAccountTicked: false
      };
    },
    props: {
      inDialog: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      formValid () {
        return this.fields.email.dirty && this.fields.password.dirty && (this.errors.collect('email').length + this.errors.collect('password').length === 0) && this.formHasValues;
      },
      formHasValues () {
        return this.submissionDetails.email.length + this.submissionDetails.password.length > 0;
      }
    },
    methods: {
      formSubmitted () {
        console.log('form submission caught');
        if (this.formValid) this.$emit('form_submitted', this.submissionDetails);
      },
      submitForm () {
        console.log('submit form event triggered in login form');
        if (this.formValid) console.log('form is valid and submitted');
      },
      inputTriggered () {
        console.log('input event triggered');
        this.$nextTick(async function () {
          this.$emit('input-triggered', {
            details: this.submissionDetails,
            valid: await this.$validator.validateAll(),
            hasValues: this.submissionDetails.email.length + this.submissionDetails.password.length > 0
          });
        });
      },
      resetForm () {
        console.log('reset login form triggered');
        // found at: https://stackoverflow.com/a/40856312/4108556 resets data object to initial
        Object.assign(this.$data, this.$options.data.call(this));
        // found at: https://github.com/baianat/vee-validate/issues/285
        this.$nextTick(function () {
          const self = this;
          Object.keys(this.fields).some(key => {
            self.$validator.flag(key, {
              untouched: true,
              dirty: false
            });
          });
          this.errors.clear();
          this.inputTriggered();
        });
      }
    },
    mounted () {
      if (this.inDialog) {
        console.log('login form mounted in dialog');
        DialogBus.$on('reset-form', () => this.resetForm());
        DialogBus.$on('submit-form', () => this.submitForm());
      }
    }
  };
</script>
