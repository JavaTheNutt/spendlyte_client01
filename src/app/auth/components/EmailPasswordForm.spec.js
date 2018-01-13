import EmailPasswordForm from './EmailPasswordForm';
import _authBus from '../service/internalAuthBus';
import { createLocalVue, shallow } from 'vue-test-utils';
import VeeValidate from 'vee-validate';
import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VeeValidate);
const sandbox = sinon.sandbox.create();
describe('EmailPasswordForm.vue', () => {
  describe('pre-mounted', () => {
    let initialData, wrapper;
    beforeEach(() => {
      wrapper = shallow(EmailPasswordForm, { localVue });
      initialData = {
        submissionDetails: {
          email: 'joebloggs@test.com',
          password: 'wwwwww'
        },
        createAccountTicked: false,
        passwordShown: false,
        confirmPassword: 'wwwwww'
      };
    });
    afterEach(() => {
      sandbox.restore();
    });
    describe('computed', () => {
      describe('has values', () => {
        it('should return false when all fields are empty', () => {
          expect(wrapper.vm.formHasValues).to.be.false;
        });
        it('should return true when there is a value in the email field', () => {
          initialData.submissionDetails.password = '';
          initialData.confirmPassword = '';
          wrapper.setData(initialData);
          expect(wrapper.vm.formHasValues).to.be.true;
        });
        it('should return true when there is a value in the password field', () => {
          initialData.submissionDetails.email = '';
          initialData.confirmPassword = '';
          wrapper.setData(initialData);
          expect(wrapper.vm.formHasValues).to.be.true;
        });
        it('should return true when there is a value in the confirm password field', () => {
          initialData.submissionDetails.email = '';
          initialData.submissionDetails.password = '';
          wrapper.setData(initialData);
          expect(wrapper.vm.formHasValues).to.be.true;
        });
        it('should return true when there is a value in all of the fields', () => {
          initialData.confirmPassword = 'j';
          initialData.submissionDetails.email = 'j';
          initialData.submissionDetails.password = 'j';
          wrapper.setData(initialData);
          expect(wrapper.vm.formHasValues).to.be.true;
        });
      });
      describe('standard fields valid', () => {
        it('should default to false', () => {
          expect(wrapper.vm.standardFieldsValid).to.be.false;
        });
        it('should return false when there is an error in the email field', async () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          initialData.submissionDetails.email = 'xxxxxx';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.standardFieldsValid).to.be.false;
        });
        it('should return false when there is an error in the password field', async () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          initialData.submissionDetails.password = 'xxx';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.standardFieldsValid).to.be.false;
        });
        it('should return true when there no errors in either field', async () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          initialData.submissionDetails.password = 'xxxxxx';
          initialData.submissionDetails.email = 'joebloggs@test.com';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.standardFieldsValid).to.be.true;
        });
      });
      describe('standard fields interacted with', () => {
        it('should return true when both the email and password fields have been interacted with', () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          expect(wrapper.vm.standardFieldsInteractedWith).to.be.true;
        });
        it('should return false when the email field has not been interacted with', () => {
          wrapper.vm.fields.email.dirty = false;
          wrapper.vm.fields.password.dirty = true;
          expect(wrapper.vm.standardFieldsInteractedWith).to.be.false;
        });
        it('should return false when the password field has not been interacted with', () => {
          wrapper.vm.fields.password.dirty = false;
          wrapper.vm.fields.email.dirty = true;
          expect(wrapper.vm.standardFieldsInteractedWith).to.be.false;
        });
      });
      describe('form interacted with', () => {
        it('should return true when all three fields have been interacted with', () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.fields.confirmPassword.dirty = true;
          expect(wrapper.vm.formInteractedWith).to.be.true;
        });
        it('should return false when the email field has not been interacted with', () => {
          wrapper.vm.fields.email.dirty = false;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.fields.confirmPassword.dirty = true;
          expect(wrapper.vm.formInteractedWith).to.be.false;
        });
        it('should return false when the password field has not been interacted with', () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = false;
          wrapper.vm.fields.confirmPassword.dirty = true;
          expect(wrapper.vm.formInteractedWith).to.be.false;
        });
        it('should return false when the confirm password field has not been interacted with', () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.fields.confirmPassword.dirty = false;
          expect(wrapper.vm.formInteractedWith).to.be.false;
        });
        it('should return false when multiple fields have not been interacted with', () => {
          wrapper.vm.fields.email.dirty = false;
          wrapper.vm.fields.password.dirty = false;
          wrapper.vm.fields.confirmPassword.dirty = true;
          expect(wrapper.vm.formInteractedWith).to.be.false;
        });
      });
      describe('form valid', () => {
        beforeEach(() => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.fields.confirmPassword.dirty = true;
        });
        describe('create new account', () => {
          beforeEach(() => {
            initialData.createAccountTicked = true;
          });
          it('should return true when all fields are valid', async () => {
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.true;
          });
          it('should return false when the email is missing', async () => {
            initialData.submissionDetails.email = '';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the email is invalid', async () => {
            initialData.submissionDetails.email = 'joe';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the password is missing', async () => {
            initialData.submissionDetails.password = '';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the password is invalid', async () => {
            initialData.submissionDetails.password = 'vv';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the confirm password is missing', async () => {
            initialData.confirmPassword = '';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the passwords do not match', async () => {
            initialData.confirmPassword = 'wwwwwww';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
        });
        describe('log into account', () => {
          beforeEach(() => {
            wrapper.vm.fields.confirmPassword.dirty = false;
            initialData.confirmPassword = '';
          });
          it('should return true when both email and password are valid', async () => {
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.true;
          });
          it('should return false when the email is missing', async () => {
            initialData.submissionDetails.email = '';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the email is invalid', async () => {
            initialData.submissionDetails.email = 'joe';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the password is missing', async () => {
            initialData.submissionDetails.password = '';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the password is invalid', async () => {
            initialData.submissionDetails.password = 'xxx';
            wrapper.setData(initialData);
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
        });
      });
    });
    describe('validation', () => {
      it('should flag invalid email addresses', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'joe'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        await wrapper.vm.$validator.validate('email');
        expect(wrapper.vm.errors.has('email')).to.be.true;
        expect(wrapper.vm.errors.first('email')).to.equal('The email field must be a valid email.');
      });
      it('should not accept blank email addresses', async () => {
        await wrapper.vm.$validator.validate('email');
        expect(wrapper.vm.errors.has('email')).to.be.true;
        expect(wrapper.vm.errors.first('email')).to.equal('The email field is required.');
      });
      it('should accept valid email addresses', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'joebloggs@test.com'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        await wrapper.vm.$validator.validate('email');
        expect(wrapper.vm.errors.has('email')).to.be.false;
      });
      it('should not accept blank passwords', async () => {
        await wrapper.vm.$validator.validate('password');
        expect(wrapper.vm.errors.has('password')).to.be.true;
        expect(wrapper.vm.errors.first('password')).to.equal('The password field is required.');
      });
      it('should not accept passwords of less than 6 characters', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwww',
            email: 'joebloggs@test.com'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        await wrapper.vm.$validator.validate('password');
        expect(wrapper.vm.errors.has('password')).to.be.true;
        expect(wrapper.vm.errors.first('password')).to.equal('The password field must be at least 6 characters.');
      });
      it('should  accept passwords that are 6 characters', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'joebloggs@test.com'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        await wrapper.vm.$validator.validate('password');
        expect(wrapper.vm.errors.has('password')).to.be.false;
      });
      it('should attach an error to confirm password when it does not match the password', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'joebloggs@test.com'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwwwx'
        });
        await wrapper.vm.$validator.validate('confirmPassword');
        expect(wrapper.vm.errors.has('confirmPassword')).to.be.true;
        expect(wrapper.vm.errors.first('confirmPassword')).to.equal('The confirmPassword value is not valid.');
      });
      // https://stackoverflow.com/questions/48063544/testing-vee-validate-confirmed-rule
      // https://github.com/baianat/Vee-validate/issues/1015
      it('should not attach an error to confirm password when it does match the password', async () => {
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'joebloggs@test.com'
          },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        await wrapper.vm.$validator.validate('confirmPassword');
        expect(wrapper.vm.errors.has('confirmPassword')).to.be.false;
      });
    });
    describe('watchers', () => {
      describe('form has values', () => {
        it('should emit an event when values are added to the form', () => {
          wrapper.setData(initialData);
          return Vue.nextTick().then(() => {
            expect(Object.keys(wrapper.emitted())).to.include('has-values-updated');
            expect(Object.keys(wrapper.emitted()[ 'has-values-updated' ]).length).to.equal(1);
            expect(wrapper.emitted()[ 'has-values-updated' ][ 0 ]).to.eql([true]);
          });
        });
        it('should emit an event when all values are removed from the form', () => {
          wrapper.setData(initialData);
          return Vue.nextTick().then(() => {
            wrapper.setData({
              submissionDetails: {
                email: '',
                password: ''
              },
              createAccountTicked: false,
              confirmPassword: ''
            });
            return Vue.nextTick().then(() => {
              expect(Object.keys(wrapper.emitted())).to.include('has-values-updated');
              expect(Object.keys(wrapper.emitted()[ 'has-values-updated' ]).length).to.equal(2);
              expect(wrapper.emitted()[ 'has-values-updated' ][ 1 ]).to.eql([false]);
            });
          });
        });
        it('should not emit an event when the values in the form are changed', () => {
          wrapper.setData(initialData);
          return Vue.nextTick().then(() => {
            wrapper.setData({
              submissionDetails: {
                email: 'johnbloggs@test.com',
                password: 'wwwwww'
              },
              createAccountTicked: false,
              confirmPassword: 'wwwwww'
            });
            return Vue.nextTick().then(() => {
              expect(Object.keys(wrapper.emitted())).to.include('has-values-updated');
              expect(Object.keys(wrapper.emitted()[ 'has-values-updated' ]).length).to.equal(1);
              expect(wrapper.emitted()[ 'has-values-updated' ][ 0 ]).to.eql([true]);
            });
          });
        });
      });
      describe('createAccountTicked', () => {
        it('should emit true if createAccountTicked === yes', () => {
          initialData.createAccountTicked = true;
          wrapper.setData(initialData);
          return Vue.nextTick().then(() => {
            expect(Object.keys(wrapper.emitted())).to.include('auth-request-type-updated');
            expect(Object.keys(wrapper.emitted()[ 'auth-request-type-updated' ]).length).to.equal(1);
            expect(wrapper.emitted()[ 'auth-request-type-updated' ][ 0 ]).to.eql([true]);
          });
        });
      });
    });
    describe('methods', () => {
      describe('form submitted', () => {
        it('should emit a form submission when the form is valid', async () => {
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.formSubmitted();
          expect(wrapper.emitted()[ 'form_submitted' ].length).to.equal(1);
        });
        it('should not emit a form submission when the form is not valid', async () => {
          initialData.submissionDetails.email = 'joe';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.formSubmitted();
          expect(Object.keys(wrapper.emitted())).to.not.include('form_submitted');
        });
      });
      describe('reset-form', () => {
        it('should reset the data to its initial values', () => {
          wrapper.setData(initialData);
          expect(wrapper.vm._data).to.eql(initialData);
          wrapper.vm.resetForm();
          expect(wrapper.vm._data).to.eql(wrapper.vm.$options.data());
        });
        it('should empty the error bag', async () => {
          initialData.submissionDetails.email = 'joe';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.errors.has('email')).to.be.true;
          await wrapper.vm.resetForm();
          expect(wrapper.vm.errors.has('email')).to.be.false;
        });
        it('should reset the fields to their initial state', async () => {
          wrapper.vm.fields.email.dirty = true;
          wrapper.vm.fields.email.pristine = false;
          wrapper.vm.fields.email.touched = true;
          wrapper.vm.fields.email.untouched = false;
          wrapper.vm.fields.password.dirty = true;
          wrapper.vm.fields.password.pristine = false;
          wrapper.vm.fields.password.touched = true;
          wrapper.vm.fields.password.untouched = false;
          wrapper.vm.fields.confirmPassword.dirty = true;
          wrapper.vm.fields.confirmPassword.pristine = false;
          wrapper.vm.fields.confirmPassword.touched = true;
          wrapper.vm.fields.confirmPassword.untouched = false;
          await wrapper.vm.$validator.validateAll();
          await wrapper.vm.resetForm();
          return Vue.nextTick().then(() => {
            expect(wrapper.vm.fields.email.dirty).to.be.false;
            expect(wrapper.vm.fields.password.dirty).to.be.false;
            expect(wrapper.vm.fields.confirmPassword.dirty).to.be.false;
            expect(wrapper.vm.fields.email.pristine).to.be.true;
            expect(wrapper.vm.fields.password.pristine).to.be.true;
            expect(wrapper.vm.fields.confirmPassword.pristine).to.be.true;
            expect(wrapper.vm.fields.email.touched).to.be.false;
            expect(wrapper.vm.fields.password.touched).to.be.false;
            expect(wrapper.vm.fields.confirmPassword.touched).to.be.false;
            expect(wrapper.vm.fields.email.untouched).to.be.true;
            expect(wrapper.vm.fields.password.untouched).to.be.true;
            expect(wrapper.vm.fields.confirmPassword.untouched).to.be.true;
          });
        });
      });
    });
  });
  describe('mounted', () => {
    let emitStub;
    beforeEach(() => {
      emitStub = sandbox.spy(_authBus, '$on');
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should attach a reset form listener when in a dialog', () => {
      shallow(EmailPasswordForm, {
        localVue,
        propsData: {
          inDialog: true
        }
      });
      expect(emitStub).to.be.calledOnce;
      expect(emitStub).to.be.calledWith('reset-form');
    });
    it('should trigger reset form when a reset form event is triggered', () => {
      const wrapper = shallow(EmailPasswordForm, {
        localVue,
        propsData: {
          inDialog: true
        }
      });
      const resetSpy = sandbox.spy(wrapper.vm, 'resetForm');
      _authBus.$emit('reset-form');
      expect(resetSpy).to.be.calledOnce;
    });
    it('should not attach a reset form listener when not in a dialog', () => {
      shallow(EmailPasswordForm, {
        localVue,
        propsData: {
          inDialog: false
        }
      });
      expect(emitStub).to.not.be.called;
    });
  });
});
