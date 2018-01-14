import GenericDialog from './GenericDialog';
import { shallow } from 'vue-test-utils';
import Bus from '@/app/events/bus';
import Vue from 'vue';

const sandbox = sinon.sandbox.create();
describe('GenericDialog.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(GenericDialog);
  });
  afterEach(() => sandbox.restore())
  describe('show dialog', () => {
    it('should correctly display a specified card', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        width: '500px'
      });
      expect(wrapper.vm.currentCard).to.equal('login-form-dialog-adapter');
      expect(wrapper.vm.width).to.equal('500px');
      expect(wrapper.vm.dialogShown).to.be.true;
    });
    it('should default to 700px when no width is provided', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      expect(wrapper.vm.currentCard).to.equal('login-form-dialog-adapter');
      expect(wrapper.vm.width).to.equal('700px');
      expect(wrapper.vm.dialogShown).to.be.true;
    });
    // fixme find a better way to implement this test than setTimeout. NextTick is insufficient
    /*  it('should attach the width property to the dialog', () => {
        Bus.$emit('show_dialog', {
          card: 'login-form-dialog-adapter',
          width: '500px'
        });
        const dialog = wrapper.find({ ref: 'genericDialog' });
        setTimeout(() => {
          expect(dialog.vnode.data.attrs[ 'max-width' ]).to.equal('500px');
        }, 1000);
      });*/
    it('should error when no params are provided', () => {
      Bus.$emit('show_dialog');
      expect(wrapper.vm.dialogShown).to.be.false;
    });
    it('should error when no card name is provided', () => {
      Bus.$emit('show_dialog', {
        width: '500px'
      });
      expect(wrapper.vm.dialogShown).to.be.false;
    });
    it('should default to not being persistent when flag is not provided', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      expect(wrapper.vm.persistent).to.be.false;
    });
    it('should set the persistent flag to true when its provided', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        persistent: true
      });
      expect(wrapper.vm.persistent).to.be.true;
    });
    it('should set the persistent flag to false when its provided', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        persistent: false
      });
      expect(wrapper.vm.persistent).to.be.false;
    });
    // fixme not passing, attrs not updated on model in time
    /* it('should attach the persistent attribute to the view', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        persistent: true
      });
      const dialog = wrapper.find({ ref: 'genericDialog' });
      expect(dialog.vnode.data.attrs[ 'persistent' ]).to.be.true;
    });*/
    // fixme find a better way to implement this test than setTimeout. NextTick is insufficient
    /* it('should reset the current component when the dialog is hidden', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      expect(wrapper.vm.dialogShown).to.be.true;
      wrapper.vm.dialogShown = false;
      setTimeout(() => {
        expect(wrapper.vm.currentCard).to.eql('');
      }, 1000);
    });*/
  });
  describe('cache state', () => {
    it('should cache the current state when a child component emits an event', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      return Vue.nextTick().then(() => {
        wrapper.vm.$refs.currentComponent.$emit('cache-state', { data: { name: 'joe bloggs' } });
        expect(wrapper.vm.cachedState.data).to.eql({ data: { name: 'joe bloggs' } });
        expect(wrapper.vm.cachedState.component).to.equal('login-form-dialog-adapter');
      });
    });
    it('should reset the cache when the dialog is closed', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      return Vue.nextTick().then(() => {
        wrapper.vm.$refs.currentComponent.$emit('cache-state', { data: { name: 'joe bloggs' } });
        wrapper.vm.dialogShown = false;
        return Vue.nextTick().then(() => {
          expect(wrapper.vm.cachedState.data).to.eql({});
          expect(wrapper.vm.cachedState.component).to.equal('');
        });
      });
    });
  });
  describe('revert state', () => {
    it('should revert the current state to the cached state', () => {
      Bus.$emit('show_dialog', {
        card: 'add-group-form-dialog-adapter'
      });
      wrapper.setData({
        dialogShown: true,
        currentCard: 'trusted-device-request-card',
        width: '500px',
        persistent: true,
        cachedState: {
          component: 'add-group-form-dialog-adapter',
          width: '700px',
          persistent: false,
          data: {
            groupName: 'family group',
            description: 'this is a group'
          }
        }
      });
      expect(wrapper.vm.currentCard).to.equal('trusted-device-request-card');
      wrapper.vm.revertState();
      expect(wrapper.vm.currentCard).to.equal('add-group-form-dialog-adapter');
      expect(wrapper.vm.width).to.equal('700px');
      expect(wrapper.vm.persistent).to.equal(false);
      expect(wrapper.vm.formInitData).to.eql({
        groupName: 'family group',
        description: 'this is a group'
      });
    });
    it('should trigger the revert state function when a revert state event is received', () => {
      const revertSpy = sandbox.spy(wrapper.vm, 'revertState');
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      return Vue.nextTick().then(() => {
        wrapper.vm.$refs.currentComponent.$emit('revert-state', { data: { name: 'joe bloggs' } });
        expect(revertSpy).to.be.calledOnce;
      });
    });
    it('should reset the cached data when the revert function is called', () => {
      Bus.$emit('show_dialog', {
        card: 'add-group-form-dialog-adapter'
      });
      wrapper.setData({
        dialogShown: true,
        currentCard: 'trusted-device-request-card',
        width: '500px',
        persistent: true,
        cachedState: {
          component: 'add-group-form-dialog-adapter',
          width: '700px',
          persistent: false,
          data: {
            groupName: 'family group',
            description: 'this is a group'
          }
        }
      });
      expect(wrapper.vm.currentCard).to.equal('trusted-device-request-card');
      wrapper.vm.revertState();
      expect(wrapper.vm.cachedState).to.eql({});
    });
  });
});
