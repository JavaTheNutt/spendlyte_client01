import NavDrawer from './NavDrawer';
import { shallow } from 'vue-test-utils';
import NavBus from './navBus';
import Vue from 'vue';
const sandbox = sinon.sandbox.create();
describe('NavDrawer.vue', () => {
  let busMock;
  beforeEach(() => {
    busMock = sandbox.mock(NavBus);
  });
  afterEach(() => sandbox.restore());
  it('should render a tile for each route passed to it', () => {
    const items = [{
      title: 'home',
      route: '/',
      icon: 'home'
    }, {
      title: 'profile',
      route: '/profile',
      icon: 'user'
    }];
    const wrapper = shallow(NavDrawer, { propsData: { items }});
    const tiles = wrapper.findAll('v-list-tile');
    expect(tiles).to.have.length.of(2);
  });
  it('should register an event handler on creation', () => {
    expect(typeof NavDrawer.created).to.equal('function');
    busMock.expects('$on').once();
    busMock.expects('$on').withArgs('toggle_drawer_button_clicked');
    shallow(NavDrawer);
    Vue.nextTick(() => {
      busMock.verify();
    });
  });
});
