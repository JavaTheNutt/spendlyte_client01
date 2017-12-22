import NavDrawer from './NavDrawer';
import { shallow } from 'vue-test-utils';
import NavBus from './navBus';
const sandbox = sinon.sandbox.create();
describe('NavDrawer.vue', () => {
  let onStub;
  beforeEach(() => {
    onStub = sandbox.stub(NavBus, '$on');
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
    shallow(NavDrawer);
    expect(onStub).to.be.calledOnce;
    expect(onStub).to.be.calledWith('toggle_drawer_button_clicked');
  });
});
