import NavToolbar from './NavToolbar';
import NavBus from './navBus';
import { shallow, mount } from 'vue-test-utils';
const sandbox = sinon.sandbox.create();
describe('NavToolbar.vue', () => {
  let emitStub;
  beforeEach(() => {
    emitStub = sandbox.stub(NavBus, '$emit');
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should contain the page title in the toolbar', () => {
    const wrapper = shallow(NavToolbar);
    const title = wrapper.find('.white--text');
    expect(title.text()).to.equal('Spend Lyte');
  });
  it('should emit an event when the button is clicked', () => {
    const wrapper = mount(NavToolbar);
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
  });
});
