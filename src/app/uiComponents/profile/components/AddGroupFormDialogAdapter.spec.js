/* global describe*/
/* global it */
import AddGroupFormDialogAdapter from './AddGroupFormDialogAdapter';
import profileBus from '../service/profileBus';
import { shallow, createLocalVue } from 'vue-test-utils';
import Vuex from 'vuex';
import store from 'store';
import Bus from '@/app/events/bus';
import preferenceTypes from '@/app/data/store/preferences/types';
const sandbox = sinon.sandbox.create();
const localVue = createLocalVue();
localVue.use(Vuex);
describe('AddGroupFormDialogAdapter.vue', () => {
  let wrapper, emitStub;
  beforeEach(() => {
    emitStub = sandbox.stub(profileBus, '$emit');
    wrapper = shallow(AddGroupFormDialogAdapter, { localVue, store });
  });
  afterEach(() => sandbox.restore());
  describe('methods', () => {
    describe('submitClicked', () => {
      describe('ask trusted', () => {
        beforeEach(() => store.commit(preferenceTypes.mutations.SET_ASK_TRUSTED, true));
        it('should trigger cache values', () => {
          const cacheSpy = sandbox.spy(wrapper.vm, 'cacheValues');
          wrapper.vm.submitClicked();
          expect(cacheSpy).to.be.calledOnce;
        });
        it('should emit a show dialog event', () => {
          const globalEmitStub = sandbox.stub(Bus, '$emit');
          wrapper.vm.submitClicked();
          expect(globalEmitStub).to.be.calledOnce;
          expect(globalEmitStub).to.be.calledWith('show_dialog');
        });
      });
      describe('do not ask trusted', () => {
        beforeEach(() => store.commit(preferenceTypes.mutations.SET_ASK_TRUSTED, false));
        it('should not trigger cache values', () => {
          const cacheSpy = sandbox.spy(wrapper.vm, 'cacheValues');
          wrapper.vm.submitClicked();
          expect(cacheSpy).to.not.be.called;
        });
        it('should not emit a show dialog event', () => {
          const globalEmitStub = sandbox.stub(Bus, '$emit');
          wrapper.vm.submitClicked();
          expect(globalEmitStub).to.not.be.called;
        });
      });
    });
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
