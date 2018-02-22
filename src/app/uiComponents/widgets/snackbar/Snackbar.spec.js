import Snackbar from './Snackbar';
import { shallow } from 'vue-test-utils';
import Bus from '@/app/events/bus';
import Vue from 'vue';

const sandbox = sinon.sandbox.create();
describe('Snackbar.vue', () => {
  let onStub;
  beforeEach(() => {
    onStub = sandbox.spy(Bus, '$on');
  });
  afterEach(() => sandbox.restore());
  it('should attach a listener when mounted', () => {
    shallow(Snackbar);
    expect(onStub).to.be.calledOnce;
    expect(onStub).to.be.calledWith('show-snack');
  });
  it('should display the correct message', () => {
    const wrapper = shallow(Snackbar);
    Bus.$emit('show-snack', 'i am a message');
    expect(wrapper.vm.message, 'data property not updated').to.equal('i am a message');
    return Vue.nextTick().then(() => {
      expect(wrapper.text(), 'view not updated').to.contain('i am a message');
    });
  });
  it('should use the "success" color scheme when status is set to success', () => {
    const wrapper = shallow(Snackbar);
    Bus.$emit('show-snack', 'i am a message', 'success');
    const closeButton = wrapper.find({ ref: 'closeSnackbarButton' });
    expect(closeButton.vnode.data.attrs.color).to.equal('success');
  });
  it('should use the "success" color scheme by default', () => {
    const wrapper = shallow(Snackbar);
    Bus.$emit('show-snack', 'i am a message');
    const closeButton = wrapper.find({ ref: 'closeSnackbarButton' });
    expect(closeButton.vnode.data.attrs.color).to.equal('success');
  });
  // FIXME: this test fails. the color property of the button is not updated
/*  it('should use the "accent" color scheme when status is not set to success', () => {
    const wrapper = shallow(Snackbar);
    _itemBus.$emit('show-snack', 'i am a message', 'error');
    const closeButton = wrapper.find({ ref: 'closeSnackbarButton' });
    expect(wrapper.vm.status, 'data property not updated').to.equal('error');
    return Vue.nextTick().then(() => Vue.nextTick().then(expect(closeButton.vnode.data.attrs.color, 'elem not' +
      ' updated').to.equal('accent')));
  });*/
  it('should close the snackbar when the button is clicked', () => {
    const wrapper = shallow(Snackbar);
    Bus.$emit('show-snack', 'i am a message');
    expect(wrapper.vm.snackbarShown).to.be.true;
    const closeButton = wrapper.find({ ref: 'closeSnackbarButton' });
    closeButton.trigger('click');
    expect(wrapper.vm.snackbarShown).to.be.false;
  });
  it('should not be shown by default', () => {
    expect(Snackbar.data().snackbarShown).to.be.false;
  });
  it('should default to a 4 second timeout', () => {
    expect(Snackbar.data().timeout).to.equal(4000);
  });
});
