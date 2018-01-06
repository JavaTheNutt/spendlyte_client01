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

        <v-flex v-show="createAccountTicked">
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
            v-validate="{required: true, is: submissionDetails.password}"
            data-vv-name="confirmPassword"
            :error-messages="errors.collect('confirmPassword')"
            @change="inputTriggered"
            @input="inputTriggered"/>
        </v-flex>
        <v-flex>
          <v-checkbox label="Create new account?"
                      v-model="createAccountTicked"
                      color="info"
                      value="yes"
                      hide-details
                      id="createNewAccountCheckbox"
                      @change="inputTriggered"
          />
        </v-flex>
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
  import _authBus from '../service/internalAuthBus';
  import * as Logger from 'loglevel';

  export default {
    name: 'email-password-form',
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
        return this.createAccountTicked ? this.standardFieldsValid && !this.errors.has('confirmPassword')
          : this.standardFieldsValid;
      },
      standardFieldsValid () {
        return this.standardFieldsInteractedWith && !this.errors.has('email') && !this.errors.has('password');
      },
      formInteractedWith () {
        return this.standardFieldsInteractedWith && this.fields.confirmPassword.dirty;
      },
      standardFieldsInteractedWith () {
        return this.hasFields && this.fields.email.dirty && this.fields.password.dirty;
      },
      hasFields () {
        return !!this.fields.email && !!this.fields.password;
      },
      formHasValues () {
        Logger.info('evaluating form has values');
        return this.submissionDetails.email.length + this.submissionDetails.password.length + this.confirmPassword.length > 0;
      }
    },
    watch: {
      formHasValues (newVal, oldVal) {
        if (newVal !== oldVal) this.$emit('has-values-updated', newVal);
      },
      formValid (newVal, oldVal) {
        if (newVal !== oldVal) this.$emit('validity-updated', newVal);
        if (newVal) this.inputTriggered();
      },
      async createAccountTicked (newVal) {
        if (newVal) await this.$validator.validate('confirmPassword');
      }
    },
    methods: {
      formSubmitted () {
        Logger.info('form submission caught');
        if (this.formValid) this.$emit('form_submitted', this.submissionDetails);
      },
      inputTriggered () {
        Logger.info('input event triggered');
        if (this.formValid) {
          this.$nextTick(function () {
            this.$emit('input-triggered', {
              details: this.submissionDetails
            });
          });
        }
      },
      clearFormData () {
        return new Promise(resolve => {
          Object.assign(this.$data, this.$options.data.call(this));
          this.$nextTick().then(() => resolve());
        });
      },
      resetForm () {
        Logger.info('reset login form triggered');
        const self = this;
        return new Promise(resolve => {
          this.clearFormData().then(() => {
            this.$nextTick().then(() => {
              self.$validator.reset();
              self.errors.clear();
              resolve();
            });
          });
        });
      }
    },
    mounted () {
      if (this.inDialog) {
        Logger.info('login form mounted in dialog');
        _authBus.$on('reset-form', () => this.resetForm());
      }
    }
  };
</script>
