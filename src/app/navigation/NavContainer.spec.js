import NavContainer from './NavContainer';
import NavToolbar from './NavToolbar';
import NavDrawer from './NavDrawer';
import NavBus from './navBus';
import { mount, shallow } from 'vue-test-utils';

const sandbox = sinon.sandbox.create();
describe('NavContainer.vue', () => {
  let toggleSpy, emitStub;
  beforeEach(() => {
    emitStub = sandbox.spy(NavBus, '$emit');
    toggleSpy = sandbox.spy(NavDrawer.methods, 'toggleShown');
  });
  afterEach(() => sandbox.restore());
  it('should contain a toolbar', () => {
    const wrapper = shallow(NavContainer);
    const toolbar = wrapper.find(NavToolbar);
    expect(toolbar.is(NavToolbar)).to.be.true;
  });
  it('should contain a drawer', () => {
    const wrapper = shallow(NavContainer);
    const drawer = wrapper.find(NavDrawer);
    expect(drawer.is(NavDrawer)).to.be.true;
  });
  it('should handle events between child components correctly', () => {
    const wrapper = mount(NavContainer);
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
    expect(toggleSpy).to.be.calledOnce;
  });
});
