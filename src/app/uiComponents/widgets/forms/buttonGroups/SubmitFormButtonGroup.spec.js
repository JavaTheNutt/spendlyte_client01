import SubmitFormButtonGroup from './SubmitFormButtonGroup';
import { shallow } from 'vue-test-utils';

describe('SubmitFormButtonGroup.vue', () => {
  let wrapper, initialProps;
  beforeEach(() => {
    initialProps = {
      hasClose: true,
      formSubmittable: false,
      hasValues: false,
      positiveText: 'Submit',
      negativeText: 'Reset',
      loading: false
    };
    wrapper = shallow(SubmitFormButtonGroup, { propsData: initialProps });
  });
  describe('props', () => {
    describe('hasClose', () => {
      it('should contain a close button when hasClose is true', () => {
        initialProps.hasClose = true;
        wrapper.setProps(initialProps);
        const closeButton = wrapper.find({ ref: 'closeButton' });
        expect(closeButton.exists()).to.be.true;
        expect(closeButton.element.innerText).to.equal('close');
      });
      it('should not contain a close button when hasClose is false', () => {
        initialProps.hasClose = false;
        wrapper.setProps(initialProps);
        const closeButton = wrapper.find({ ref: 'closeButton' });
        expect(closeButton.exists()).to.be.false;
      });
    });
    describe('formSubmittable', () => {
      it('should enable the submit button when true', () => {
        initialProps.formSubmittable = false;
        wrapper.setProps(initialProps);
        const submitButton = wrapper.find({ ref: 'positiveButton' });
        expect(submitButton.vnode.data.attrs.disabled).to.be.true;
      });
      it('should disable the submit button when false', () => {
        initialProps.formSubmittable = true;
        wrapper.setProps(initialProps);
        const submitButton = wrapper.find({ ref: 'positiveButton' });
        expect(submitButton.vnode.data.attrs.disabled).to.be.false;
      });
    });
    describe('formHasValues', () => {
      it('should disable the reset button when false', () => {
        initialProps.formHasValues = false;
        wrapper.setProps(initialProps);
        const resetButton = wrapper.find({ ref: 'negativeButton' });
        expect(resetButton.vnode.data.attrs.disabled).to.be.true;
      });
      it('should enable the reset button when true', () => {
        initialProps.formHasValues = true;
        wrapper.setProps(initialProps);
        const resetButton = wrapper.find({ ref: 'negativeButton' });
        expect(resetButton.vnode.data.attrs.disabled).to.be.false;
      });
    });
    describe('positiveText', () => {
      it('should set the text of the button to the value of positive text', () => {
        wrapper.setProps(initialProps);
        const submitButton = wrapper.find({ ref: 'positiveButton' });
        expect(submitButton.text()).to.equal(initialProps.positiveText);
      });
    });
    describe('negativeText', () => {
      it('should set the text of the button to the value of negativeText', () => {
        wrapper.setProps(initialProps);
        const resetButton = wrapper.find({ ref: 'negativeButton' });
        expect(resetButton.text()).to.equal(initialProps.negativeText);
      });
    });
    describe('loading', () => {
      it('should show the loading container when loading is true', () => {
        initialProps.loading = true;
        wrapper.setProps(initialProps);
        const loadingContainer = wrapper.find({ ref: 'loadingContainer' });
        const submitButton = wrapper.find({ ref: 'positiveButton' });
        expect(submitButton.exists()).to.be.false;
        expect(loadingContainer.exists()).to.be.true;
      });
      it('should hide the loading container when loading is false', () => {
        initialProps.loading = false;
        wrapper.setProps(initialProps);
        const loadingContainer = wrapper.find({ ref: 'loadingContainer' });
        const submitButton = wrapper.find({ ref: 'positiveButton' });
        expect(submitButton.exists()).to.be.true;
        expect(loadingContainer.exists()).to.be.false;
      });
    });
  });
  describe('events', () => {
    describe('close clicked', () => {
      it('should emit a "close-clicked" event when close is clicked', () => {
        initialProps.hasClose = true;
        wrapper.setProps(initialProps);
        const closeButton = wrapper.find({ ref: 'closeButton' });
        closeButton.trigger('click');
        expect(Object.keys(wrapper.emitted())).to.include('close-clicked');
      });
    });
    describe('submit clicked', () => {
      it('should emit a "submit-clicked" event when submit is clicked', () => {
        initialProps.formSubmittable = true;
        wrapper.setProps(initialProps);
        const submit = wrapper.find({ ref: 'positiveButton' });
        submit.trigger('click');
        expect(Object.keys(wrapper.emitted())).to.include('submit-clicked');
      });
    });
    describe('reset clicked', () => {
      it('should emit a "reset-clicked" event when reset is clicked', () => {
        initialProps.hasValues = true;
        wrapper.setProps(initialProps);
        const reset = wrapper.find({ ref: 'negativeButton' });
        reset.trigger('click');
        expect(Object.keys(wrapper.emitted())).to.include('reset-clicked');
      });
    });
  });
});
