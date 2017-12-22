import NavToolbar from './NavToolbar';
import NavBus from './navBus';
import { shallow, mount } from 'vue-test-utils';
const sandbox = sinon.sandbox.create();
import Vue from 'vue';
describe('NavToolbar.vue', () => {
  let busMock;
  beforeEach(() => {
    busMock = sandbox.mock(NavBus);
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
    busMock.expects('$emit').once();
    busMock.expects('$emit').withArgs('toggle_drawer_button_clicked');
    const wrapper = mount(NavToolbar);
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    Vue.nextTick(() => {
      busMock.verify();
    });
  });
});
