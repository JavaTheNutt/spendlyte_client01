import { shallow } from 'vue-test-utils';
import LoginFormDialogAdapter from './LoginFormDialogAdapter';
import _authBus from '../service/internalAuthBus';
import firebase from 'firebase';
import Vue from 'vue';

const sandbox = sinon.sandbox.create();

describe('LoginFormDialogAdapter.vue', () => {
  let wrapper, emitStub, createUserWithEmailAndPasswordStub, signInWithEmailAndPasswordStub, authStub, initialData;
  beforeEach(() => {
    wrapper = shallow(LoginFormDialogAdapter);
    emitStub = sandbox.stub(_authBus, '$emit');
    createUserWithEmailAndPasswordStub = sandbox.stub();
    signInWithEmailAndPasswordStub = sandbox.stub();
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns({
      createUserWithEmailAndPassword: createUserWithEmailAndPasswordStub,
      signInWithEmailAndPassword: signInWithEmailAndPasswordStub
    });
    initialData = {
      formSubmittable: true,
      formHasValues: true,
      isCreateNew: false,
      formData: {
        email: 'joebloggs@test.com',
        password: 'gggggg'
      }
    };
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
    describe('auth-request-type-updated', () => {
      it('should set the isCreate flag to the value emitted', () => {
        wrapper.vm.$refs.loginForm.$emit('auth-request-type-updated', true);
        expect(wrapper.vm.isCreateNew).to.be.true;
        wrapper.vm.$refs.loginForm.$emit('auth-request-type-updated', false);
        expect(wrapper.vm.isCreateNew).to.be.false;
      });
    });
    describe('submit-clicked', () => {
      describe('form valid', () => {
        it('should trigger the login function when "isCreateNew" is false', () => {
          wrapper.setData(initialData);
          wrapper.vm.$refs.loginButtonGroup.$emit('submit-clicked');
          return Vue.nextTick().then(() => {
            expect(signInWithEmailAndPasswordStub).to.be.calledOnce;
            expect(createUserWithEmailAndPasswordStub).to.not.be.called;
          });
        });
        it('should trigger the sign up function when "isCreateNew" is true', () => {
          initialData.isCreateNew = true;
          wrapper.setData(initialData);
          wrapper.vm.$refs.loginButtonGroup.$emit('submit-clicked');
          return Vue.nextTick().then(() => {
            expect(createUserWithEmailAndPasswordStub).to.be.calledOnce;
            expect(signInWithEmailAndPasswordStub).to.not.be.called;
          });
        });
        it('should close the dialog when login returns a positive result', async () => {
          signInWithEmailAndPasswordStub.resolves(true);
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(Object.keys(wrapper.emitted())).to.include('dialog-closed');
          expect(Object.keys(wrapper.emitted()[ 'dialog-closed' ]).length).to.equal(1);
        });
        it('should close the dialog when signup returns a positive result', async () => {
          initialData.isCreateNew = true;
          createUserWithEmailAndPasswordStub.resolves(true);
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(Object.keys(wrapper.emitted())).to.include('dialog-closed');
          expect(Object.keys(wrapper.emitted()[ 'dialog-closed' ]).length).to.equal(1);
        });
        it('should reset the form when login returns a positive result', async () => {
          signInWithEmailAndPasswordStub.resolves(true);
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(emitStub).to.be.calledOnce;
          expect(emitStub).to.be.calledWith('reset-form');
        });
        it('should reset the form when signup returns a positive result', async () => {
          initialData.isCreateNew = true;
          createUserWithEmailAndPasswordStub.resolves(true);
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(emitStub).to.be.calledOnce;
          expect(emitStub).to.be.calledWith('reset-form');
        });
        it('should not close the dialog when Firebase throws an error during login', async () => {
          signInWithEmailAndPasswordStub.throws(Error('i am an error'));
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(Object.keys(wrapper.emitted())).to.not.include('dialog-closed');
        });
        it('should not close the dialog when Firebase throws an error during signup', async () => {
          initialData.isCreateNew = true;
          createUserWithEmailAndPasswordStub.throws(Error('i am an error'));
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(Object.keys(wrapper.emitted())).to.not.include('dialog-closed');
        });
        it('should not reset the form when Firebase throws an error during login', async () => {
          signInWithEmailAndPasswordStub.throws(Error('i am an error'));
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(emitStub).to.not.be.called;
        });
        it('should not reset the form when Firebase throws an error during signup', async () => {
          initialData.isCreateNew = true;
          createUserWithEmailAndPasswordStub.throws(Error('i am an error'));
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(emitStub).to.not.be.called;
        });
      });
      describe('form invalid', () => {
        beforeEach(() => {
          initialData.formSubmittable = false;
        });
        it('should not emit close dialog', async () => {
          createUserWithEmailAndPasswordStub.resolves(true);
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(Object.keys(wrapper.emitted())).to.eql([]);
        });
        it('should not call any of the authentication functions', async () => {
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(signInWithEmailAndPasswordStub).to.not.be.called;
          expect(createUserWithEmailAndPasswordStub).to.not.be.called;
        });
        it('should not emit reset form', async () => {
          wrapper.setData(initialData);
          await wrapper.vm.submitClicked();
          expect(emitStub).to.not.be.called;
        });
      });
    });
  });
});
