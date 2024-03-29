<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
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
                  id="emailField"
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
                  id="passwordField"
                />
              </v-flex>

              <v-flex
                v-show="createAccountTicked">
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
                  @input="inputTriggered"
                  id="confirmPasswordField"
                  v-show="createAccountTicked"
                />
              </v-flex>
              <v-flex v-if="false">
                <v-checkbox label="Create new account?"
                            v-model="createAccountTicked"
                            color="info"
                            :value="true"
                            hide-details
                            id="createNewAccountCheckbox"
                            @change="inputTriggered"
                            v-if="false"
                />
              </v-flex>
              <v-flex>
                <v-checkbox
                  label="Trust this device?"
                  v-model="submissionDetails.trustedDevice"
                  color="info"
                  :value="true"
                  hide-details
                  id="trustDeviceCheckbox"
                  @change="inputTriggered"
                  prepend-icon="help"
                  :prepend-icon-cb="() => (trustedHelpShown = !trustedHelpShown)"
                />
              </v-flex>
              <v-flex class="text-xs-left">
                <v-slide-y-transition>
                  <v-card v-if="trustedHelpShown">
                    <v-card-title class="subtitle">If you choose to set this device as trusted, your data will be available offline, and you will not be signed out when you close this tab. Please choose this option if this is a device you own</v-card-title>
                  </v-card>
                </v-slide-y-transition>
              </v-flex>
            </v-layout>
            <v-layout v-if="true">
              <v-flex v-if="!createAccountTicked">
                <p class="caption">New Here? Then <a @click="showSignupClicked">create an account</a>!</p>
              </v-flex>
              <v-flex v-if="createAccountTicked">
                <p class="caption">Already got an account? Then <a @click="showLoginClicked">login</a>!</p>
              </v-flex>
            </v-layout>
          </v-container>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import _authBus from '../service/internalAuthBus';

  export default {
    name: 'email-password-form',
    data () {
      return {
        submissionDetails: {
          email: '',
          password: '',
          trustedDevice: true
        },
        confirmPassword: '',
        passwordShown: false,
        createAccountTicked: false,
        trustedHelpShown: false
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
        console.log('evaluating form has values');
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
        this.$emit('auth-request-type-updated', newVal || false);
        if (newVal) await this.$validator.validate('confirmPassword');
      }
    },
    methods: {
      formSubmitted () {
        console.log('form submission caught');
        if (this.formValid) this.$emit('form_submitted', this.submissionDetails);
      },
      inputTriggered () {
        console.log('input event triggered');
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
      showLoginClicked () {
        console.log('show login function triggered');
        this.createAccountTicked = false;
      },
      showSignupClicked () {
        console.log('show signup function triggered');
        this.createAccountTicked = true;
      },
      resetForm () {
        console.log('reset login form triggered');
        // const self = this;
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
    mounted () {
      if (this.inDialog) {
        console.log('login form mounted in dialog');
        _authBus.$on('reset-form', () => this.resetForm());
      }
    }
  };
</script>
