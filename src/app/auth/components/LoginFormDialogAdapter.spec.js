import { shallow } from 'vue-test-utils';
import LoginFormDialogAdapter from './LoginFormDialogAdapter';
import _authBus from '../service/internalAuthBus';

const sandbox = sinon.sandbox.create();

describe('LoginFormDialogAdapter.vue', () => {
  let wrapper, emitStub;
  beforeEach(() => {
    wrapper = shallow(LoginFormDialogAdapter);
    emitStub = sandbox.stub(_authBus, '$emit');
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('events', () => {
    describe('close dialog', () => {
      it('should emit an event to its parent when a close dialog event is triggered', () => {
        wrapper.vm.$refs.loginButtonGroup.$emit('close-clicked');
        expect(Object.keys(wrapper.emitted())).to.include('dialog-closed');
      });
      it('should emit an event on the internal bus when a close dialog event is triggered', () => {
        wrapper.vm.$refs.loginButtonGroup.$emit('close-clicked');
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('reset-form');
      });
    });
    describe('reset form', () => {
      it('should emit a reset event along the internal bus', () => {
        wrapper.vm.$refs.loginButtonGroup.$emit('reset-clicked');
        expect(emitStub).to.be.calledOnce;
        expect(emitStub).to.be.calledWith('reset-form');
      });
    });
    describe('input triggered', () => {
      it('should update the component state with the data passed', () => {
        const emittedData = {
          details: {
            email: 'joe.bloggs@test.com',
            password: 'xxxxxx'
          }
        };
        wrapper.vm.$refs.loginForm.$emit('input-triggered', emittedData);
        expect(wrapper.vm.formData).to.eql(emittedData.details);
      });
    });
    describe('validity updated', () => {
      it('should update the component state with the data passed', () => {
        wrapper.vm.$refs.loginForm.$emit('validity-updated', true);
        expect(wrapper.vm.formSubmittable).to.be.true;
        wrapper.vm.$refs.loginForm.$emit('validity-updated', false);
        expect(wrapper.vm.formSubmittable).to.be.false;
      });
    });
    describe('values updated', () => {
      it('should update the component state with the data passed', () => {
        wrapper.vm.$refs.loginForm.$emit('has-values-updated', true);
        expect(wrapper.vm.formHasValues).to.be.true;
        wrapper.vm.$refs.loginForm.$emit('has-values-updated', false);
        expect(wrapper.vm.formHasValues).to.be.false;
      });
    });
     describe.only('auth-request-type-updated', () => {
      it('should set the isCreate flag to the value emitted', () => {
        wrapper.vm.$refs.loginForm.$emit('auth-request-type-updated', true);
        expect(wrapper.vm.isCreateNew).to.be.true;
        wrapper.vm.$refs.loginForm.$emit('auth-request-type-updated', false);
        expect(wrapper.vm.isCreateNew).to.be.false;
      });
    });
  });
});
