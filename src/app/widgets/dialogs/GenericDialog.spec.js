import GenericDialog from './GenericDialog';
import { shallow } from 'vue-test-utils';

describe('GenericDialog.vue', () => {
  describe('fetchActionNames', () => {
    it('should return the name of the function, replacing "card" with "actions"', () => {
      const wrapper = shallow(GenericDialog);
      const refinedName = wrapper.vm.fetchActions('some-card');
      expect(refinedName).to.equal('some-actions');
    });
  });
});
