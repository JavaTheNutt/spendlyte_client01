/* global describe*/
/* global it */
/* global sinon */

import FormDialogAdapterMixin from './FormDialogAdapter';
import { shallow } from 'vue-test-utils';
import Vue from 'vue';
const fakeBus = new Vue();
const testComponent = Vue.component('test', {
  mixins: [FormDialogAdapterMixin],
  created () {
    this._evb = fakeBus;
  }
});
const sandbox = sinon.sandbox.create();
describe('Form Mixin', () => {
  let wrapper, emitStub;
  beforeEach(() => {
    emitStub = sandbox.stub(fakeBus, '$emit');
    wrapper = shallow(testComponent);
  });
  afterEach(() => sandbox.restore());
  describe('methods', () => {
    describe('closeDialog', () => {
      it('should emit a "dialog-closed" event to the parent', () => {
        wrapper.vm.closeDialog();
        expect(wrapper.emitted()['dialog-closed'].length).to.equal(1);
      });
      it('should emit a "reset-form" event on the local bus', () => {
        wrapper.vm.closeDialog();
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('reset-form');
      });
    });
    describe('resetClicked', () => {
      it('should emit a "reset-form" event along the local bus', () => {
        wrapper.vm.resetClicked();
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('reset-form');
      });
    });
    describe('inputTriggered', () => {
      it('should set form data to the value passed', () => {
        const details = {
          email: 'joebloggs@test.com',
          password: 'pa$$w0rd'
        };
        wrapper.vm.inputTriggered({ details });
        expect(wrapper.vm.formData).to.eql(details);
      });
    });
    describe('validityUpdated', () => {
      it('should set the value to the value passed', () => {
        wrapper.vm.validityUpdated(true);
        expect(wrapper.vm.formSubmittable).to.be.true;
      });
      it('should convert non-booleans to boolean', () => {
        wrapper.vm.validityUpdated(0);
        expect(wrapper.vm.formSubmittable).to.be.false;
        wrapper.vm.validityUpdated(1);
        expect(wrapper.vm.formSubmittable).to.be.true;
      });
    });
    describe('valuesUpdated', () => {
      it('should set formHas Values to the data passed', () => {
        wrapper.vm.valuesUpdated(true);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
      it('should convert non-booleans to boolean', () => {
        wrapper.vm.valuesUpdated(0);
        expect(wrapper.vm.formHasValues).to.be.false;
        wrapper.vm.valuesUpdated(1);
        expect(wrapper.vm.formHasValues).to.be.true;
      });
    });
    describe('cacheValues', () => {
      it('should emit a cache values event', () => {
        wrapper.vm.cacheValues();
        expect(wrapper.emitted()['cache-state'].length).to.equal(1);
      });
      it('should emit the formData', () => {
        const details = {
          email: 'joebloggs@test.com',
          password: 'pa$$w0rd'
        };
        wrapper.vm.formData = details;
        wrapper.vm.cacheValues();
        console.log(wrapper.emitted()['cache-state'][0]);
        expect(wrapper.emitted()['cache-state'][0][0]).to.eql(details);
      });
    });
    describe('revertState', () => {
      it('should emit a revert state event', () => {
        wrapper.vm.revertState();
        expect(wrapper.emitted()['revert-state'].length).to.equal(1);
      });
    });
  });
});
