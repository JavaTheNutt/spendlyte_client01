import GenericDialog from './GenericDialog';
import { shallow } from 'vue-test-utils';
import Bus from '@/app/events/bus';
// import Vue from 'vue';

describe('GenericDialog.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(GenericDialog);
  });
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
    it('should attach the width property to the dialog', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        width: '500px'
      });
      const dialog = wrapper.find({ ref: 'genericDialog' });
      setTimeout(() => {
        expect(dialog.vnode.data.attrs[ 'max-width' ]).to.equal('500px');
      }, 1000);
    });
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
    // fixme find a better way to implement this test than setTimeout. NextTick is insufficient
    it('should reset the current component when the dialog is hidden', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter'
      });
      expect(wrapper.vm.dialogShown).to.be.true;
      wrapper.vm.dialogShown = false;
      setTimeout(() => {
        expect(wrapper.vm.currentCard).to.eql('');
      }, 1000);
    });
  });
});
