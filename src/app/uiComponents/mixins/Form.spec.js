/* global describe*/
/* global it */
import FormMixin from './Form';
import { shallow, createLocalVue } from 'vue-test-utils';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

const fakeBus = new Vue();
const localVue = createLocalVue();
localVue.use(VeeValidate);
const testComponent = Vue.component('test', {
  mixins: [FormMixin],
  created () {
    this._evb = fakeBus;
    this._formValid = false;
    this.$validator.attach({ name: 'name', rules: { required: true }});
  },
  computed: {
    formValid () {
      return this._formValid;
    }
  }

});
const sandbox = sinon.sandbox.create();
describe('FormMixin', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(testComponent, { localVue });
  });
  afterEach(() => sandbox.restore());
  describe('computed', () => {
    describe('formHasValues', () => {
      it('should return true when any field has a value', () => {
        wrapper.setData({ submissionDetails: { name: 'test' }});
        expect(wrapper.vm.formHasValues).to.be.true;
      });
      it('should return false when no fields have values', () => {
        wrapper.setData({ submissionDetails: {}});
        expect(wrapper.vm.formHasValues).to.be.false;
      });
    });
  });
  describe('events', () => {
    it('should trigger a form reset when a reset-form event is recieved', () => {
      const resetSpy = sandbox.spy(wrapper.vm, 'resetForm');
      fakeBus.$emit('reset-form');
      expect(resetSpy).to.be.called;
    });
  });
  describe('methods', () => {
    describe('formSubmitted', () => {
      it('should emit an event when the form is valid', () => {
        wrapper.setData({ submissionDetails: { name: 'something' }, _formValid: true });
        wrapper.vm.formSubmitted();
        expect(wrapper.emitted()['form_submitted'].length).to.equal(1);
      });
      it('should emit the form data when it emits an event', () => {
        wrapper.setData({ submissionDetails: { name: 'something' }, _formValid: true });
        wrapper.vm.formSubmitted();
        expect(wrapper.emitted()['form_submitted'][0][0]).to.eql({ name: 'something' });
      });
      it('should not emit an event when the form is invalid', () => {
        wrapper.setData({ submissionDetails: { name: 'something' }, _formValid: false });
        wrapper.vm.formSubmitted();
        expect(wrapper.emitted()['form_submitted']).to.not.exist;
      });
    });
    describe('inputTriggered', () => {
      it('should not emit an event when the form is invalid', () => {
        wrapper.setData({ submissionDetails: { name: 'something' }, _formValid: false });
        wrapper.vm.inputTriggered();
        return Vue.nextTick().then(() => expect(wrapper.emitted()['input-triggered']).to.not.exist);
      });
      it('should emit an event when the form is valid', () => {
        wrapper.setData({ submissionDetails: { name: 'something' }, _formValid: true });
        wrapper.vm.inputTriggered();
        return Vue.nextTick().then(() => expect(wrapper.emitted()['input-triggered'].length).to.be.above(0));
      });
    });
    describe('clearFormData', () => {
      it('should reset the data to initial', async () => {
        wrapper.setData({ submissionDetails: { name: 'something' }});
        expect(wrapper.vm.submissionDetails).to.eql({ name: 'something' });
        await wrapper.vm.clearFormData();
        expect(wrapper.vm._data).to.eql(wrapper.vm.$options.data());
      });
    });
    describe('resetForm', () => {
      it('should reset the flags', async () => {
        wrapper.vm.fields.name.dirty = true;
        wrapper.vm.fields.name.pristine = false;
        wrapper.vm.fields.name.touched = true;
        wrapper.vm.fields.name.untouched = false;
        await wrapper.vm.$validator.validateAll();
        await wrapper.vm.resetForm();
        return Vue.nextTick().then(() => {
          expect(wrapper.vm.fields.name.dirty).to.be.false;
          expect(wrapper.vm.fields.name.pristine).to.be.true;
          expect(wrapper.vm.fields.name.touched).to.be.false;
          expect(wrapper.vm.fields.name.untouched).to.be.true;
        });
      });
      it('should clear the error bag', async () => {
        wrapper.setData({ submissionDetails: {}});
        await wrapper.vm.$validator.validateAll();
        expect(wrapper.vm.errors.has('name')).to.be.true;
        await wrapper.vm.resetForm();
        expect(wrapper.vm.errors.has('name')).to.be.false;
      });
      it('should clear the form', async () => {
        wrapper.setData({ submissionDetails: { name: 'something' }});
        expect(wrapper.vm.submissionDetails).to.eql({ name: 'something' });
        await wrapper.vm.resetForm();
        expect(wrapper.vm._data).to.eql(wrapper.vm.$options.data());
      });
    });
  });
});
