/* global describe */
/* global it*/
import { shallow, createLocalVue } from 'vue-test-utils';
import VeeValidate from 'vee-validate';
import AddGroupForm from './AddGroupForm';
const localVue = createLocalVue();
localVue.use(VeeValidate);
describe('AddGroupForm.vue', () => {
  describe('pre-mounted', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(AddGroupForm, { localVue });
    });
    describe('computed', () => {
      describe('form valid', () => {
        describe('prevalidated', () => {
          it('should return true when name has a value', async () => {
            wrapper.setData({ submissionDetails: { name: 'wwww' }, prevalidated: true });
            wrapper.vm.fields.groupName.dirty = false;
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.true;
          });
          it('should return false when name has no value', async () => {
            wrapper.setData({ submissionDetails: { name: '' }, prevalidated: true });
            wrapper.vm.fields.groupName.dirty = false;
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
        });
        describe('initial validation', () => {
          it('should return false by default', () => {
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the field is not dirty, but it has a value', async () => {
            wrapper.setData({ submissionDetails: { name: 'wwwww' }});
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return false when the field is dirty, but has no value', async () => {
            wrapper.setData({ submissionDetails: { name: '' }});
            wrapper.vm.fields.groupName.dirty = true;
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.false;
          });
          it('should return true when the value has a length greater than three and the field is dirty', async () => {
            wrapper.setData({ submissionDetails: { name: 'wwww' }});
            wrapper.vm.fields.groupName.dirty = true;
            await wrapper.vm.$validator.validateAll();
            expect(wrapper.vm.formValid).to.be.true;
          });
        });
      });
    });
  });
  describe('mounting', () => {
    const propsData = {
      initialData: {
        name: 'www'
      }
    };
    it('should set "prevalidated" to true when there is initial data', () => {
      const wrapper = shallow(AddGroupForm, { localVue, propsData });
      expect(wrapper.vm.prevalidated).to.be.true;
    });
    it('should set "submissionDetails" to the initial data when it exists', () => {
      const wrapper = shallow(AddGroupForm, { localVue, propsData });
      expect(wrapper.vm.submissionDetails).to.eql(propsData.initialData);
    });
    it('should not set "prevalidated" when initial data does not exist', () => {
      const wrapper = shallow(AddGroupForm, { localVue });
      expect(wrapper.vm.prevalidated).to.be.false;
    });
    it('should not set "submissionDetails" when the initial data does not exist', () => {
      const wrapper = shallow(AddGroupForm, { localVue });
      expect(wrapper.vm.submissionDetails).to.eql({ name: '', description: '' });
    });
  });
});
