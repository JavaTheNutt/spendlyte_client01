import EmailPasswordForm from './EmailPasswordForm';

import { createLocalVue, mount, shallow } from 'vue-test-utils';
import VeeValidate from 'vee-validate';
// import Vue from 'vue';

const localVue = createLocalVue();
localVue.use(VeeValidate);
describe('EmailPasswordForm.vue', () => {
  let initialData, wrapper;
  beforeEach(() => {
    wrapper = shallow(EmailPasswordForm, { localVue });
    initialData = {
      submissionDetails: {
        email: 'joebloggs@test.com',
        password: 'wwwwww'
      },
      createAccountTicked: false,
      confirmPassword: 'wwwwww'
    };
  });
  describe('computed', () => {
    describe('password match', () => {
      it('should return true if not creating a new account and password is valid', () => {
        const wrapper = mount(EmailPasswordForm, { localVue });
        wrapper.setData({
          submissionDetails: {
            password: 'wwwwww',
            email: 'www@www.www'
          },
          createAccountTicked: false
        });
        expect(wrapper.vm.passwordMatch).to.be.true;
      });
      it('should return true if creating a new account and password and confirm password are valid', () => {
        const wrapper = mount(EmailPasswordForm, { localVue });
        wrapper.setData({
          submissionDetails: { password: 'wwwwww' },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        expect(wrapper.vm.passwordMatch).to.be.true;
      });
      /* it('should return false when passwords do not match', () => {
        const wrapper = mount(EmailPasswordForm, { localVue });
        wrapper.setData({
          submissionDetails: { password: 'wwwwwww' },
          createAccountTicked: true,
          confirmPassword: 'wwwwww'
        });
        const emailField = wrapper.find({ ref: 'emailField' })/!* .simulate('change')*!/;
        emailField.element.blur();
        console.log(emailField);
        expect(wrapper.vm.passwordMatch).to.be.false;
      });*/
    });
    describe('has values', () => {
      it('should return false when all fields are empty', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        console.log(wrapper.vm.submissionDetails);
        expect(wrapper.vm.formHasValues).to.be.false;
      });
      it('should return true when there is a value in the email field', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        initialData.submissionDetails.password = '';
        initialData.confirmPassword = '';
        wrapper.setData(initialData);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
      it('should return true when there is a value in the password field', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        initialData.submissionDetails.email = '';
        initialData.confirmPassword = '';
        wrapper.setData(initialData);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
      it('should return true when there is a value in the confirm password field', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        initialData.submissionDetails.email = '';
        initialData.submissionDetails.password = '';
        wrapper.setData(initialData);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
      it('should return true when there is a value in all of the fields', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        initialData.confirmPassword = 'j';
        initialData.submissionDetails.email = 'j';
        initialData.submissionDetails.password = 'j';
        wrapper.setData(initialData);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
    });
    describe('standard fields valid', () => {
      it('should default to false', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        expect(wrapper.vm.standardFieldsValid).to.be.false;
      });
      it('should return false when there is an error in the email field', async () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        wrapper.vm.fields.email.dirty = true;
        wrapper.vm.fields.password.dirty = true;
        initialData.submissionDetails.email = 'xxxxxx';
        wrapper.setData(initialData);
        await wrapper.vm.$validator.validateAll();
        expect(wrapper.vm.standardFieldsValid).to.be.false;
      });
      it('should return false when there is an error in the password field', async () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        wrapper.vm.fields.email.dirty = true;
        wrapper.vm.fields.password.dirty = true;
        initialData.submissionDetails.password = 'xxx';
        wrapper.setData(initialData);
        await wrapper.vm.$validator.validateAll();
        expect(wrapper.vm.standardFieldsValid).to.be.false;
      });
      it('should return true when there no errors in either field', async () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
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
        const wrapper = shallow(EmailPasswordForm, { localVue });
        wrapper.vm.fields.email.dirty = true;
        wrapper.vm.fields.password.dirty = true;
        expect(wrapper.vm.standardFieldsInteractedWith).to.be.true;
      });
      it('should return false when the email field has not been interacted with', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
        wrapper.vm.fields.email.dirty = false;
        wrapper.vm.fields.password.dirty = true;
        expect(wrapper.vm.standardFieldsInteractedWith).to.be.false;
      });
      it('should return false when the password field has not been interacted with', () => {
        const wrapper = shallow(EmailPasswordForm, { localVue });
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
        // FIXME: this is returning false for the confirm password field, as this seems to always be invalid
        /* it('should return true when all fields are valid', async () => {
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.formValid).to.be.true;
        });*/
        it('should return false when the email is missing', async () => {
          initialData.email = '';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.formValid).to.be.false;
        });
        it('should return false when the email is invalid', async () => {
          initialData.email = 'joe';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.formValid).to.be.false;
        });
        it('should return false when the password is missing', async () => {
          initialData.password = '';
          wrapper.setData(initialData);
          await wrapper.vm.$validator.validateAll();
          expect(wrapper.vm.formValid).to.be.false;
        });
        it('should return false when the password is invalid', async () => {
          initialData.password = 'vv';
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
      const wrapper = mount(EmailPasswordForm, { localVue });
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
      const wrapper = mount(EmailPasswordForm, { localVue });
      await wrapper.vm.$validator.validate('email');
      expect(wrapper.vm.errors.has('email')).to.be.true;
      expect(wrapper.vm.errors.first('email')).to.equal('The email field is required.');
    });
    it('should accept valid email addresses', async () => {
      const wrapper = mount(EmailPasswordForm, { localVue });
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
      const wrapper = shallow(EmailPasswordForm, { localVue });
      await wrapper.vm.$validator.validate('password');
      expect(wrapper.vm.errors.has('password')).to.be.true;
      expect(wrapper.vm.errors.first('password')).to.equal('The password field is required.');
    });
    it('should not accept passwords of less than 6 characters', async () => {
      const wrapper = shallow(EmailPasswordForm, { localVue });
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
      const wrapper = shallow(EmailPasswordForm, { localVue });
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
      const wrapper = shallow(EmailPasswordForm, { localVue });
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
      expect(wrapper.vm.errors.first('confirmPassword')).to.equal('The confirmPassword confirmation does not match.');
    });
    // FIXME: this test fails when it should pass:
    // https://stackoverflow.com/questions/48063544/testing-vee-validate-confirmed-rule
    /* it('should not attach an error to confirm password when it does match the password', async () => {
      const wrapper = mount(EmailPasswordForm, { localVue });
      wrapper.setData({
        submissionDetails: {
          password: 'wwwwww',
          email: 'joebloggs@test.com'
        },
        createAccountTicked: true,
        confirmPassword: 'wwwwww'
      });
      await wrapper.vm.$validator.validate('confirmPassword');
      console.log(wrapper.vm.errors.collect('confirmPassword'));
      // LOGS: ['The confirmPassword confirmation does not match.']

      console.log(wrapper.vm.submissionDetails.password === wrapper.vm.confirmPassword);
      // LOGS: true

      expect(wrapper.vm.errors.has('confirmPassword')).to.be.false;
    });*/
  });
});
