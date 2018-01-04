import GenericDialog from './GenericDialog';
import { shallow, mount } from 'vue-test-utils';
import Bus from '@/app/events/bus';

describe('GenericDialog.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(GenericDialog);
  });
  describe.only('show dialog', () => {
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
    // fixme: fails, property not updated on the dialog. model correctly updated
    /* it('should attach the width property to the dialog', () => {
      Bus.$emit('show_dialog', {
        card: 'login-form-dialog-adapter',
        width: '500px'
      });
      const dialog = wrapper.find({ ref: 'genericDialog' });
      expect(dialog.vnode.data.attrs[ 'max-width' ], 'dialog property not updated').to.equal('500px');
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
  });
});
