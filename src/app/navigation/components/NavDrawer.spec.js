import NavDrawer from './NavDrawer';
import { shallow, createLocalVue } from 'vue-test-utils';
import NavBus from '../service/navBus';

const sandbox = sinon.sandbox.create();
describe('NavDrawer.vue', () => {
  let onStub, pushStub, mockedRouter, localVue;
  const items = [{
    title: 'home',
    route: '/',
    icon: 'home'
  }, {
    title: 'profile',
    route: '/profile',
    icon: 'user'
  }];
  beforeEach(() => {
    onStub = sandbox.stub(NavBus, '$on');
    pushStub = sandbox.stub();
    mockedRouter = { push: pushStub };
    localVue = createLocalVue();
  });
  afterEach(() => sandbox.restore());
  it('should render a tile for each route passed to it', () => {
    const wrapper = shallow(NavDrawer, { propsData: { items }});
    const tiles = wrapper.findAll('v-list-tile');
    expect(tiles).to.have.length.of(3); // one extra because of footer
  });
  it('should register an event handler on creation', () => {
    shallow(NavDrawer);
    expect(onStub).to.be.calledOnce;
    expect(onStub).to.be.calledWith('toggle_drawer_button_clicked');
  });
  it('should call redirect when a link is clicked', () => {
    const wrapper = shallow(NavDrawer, {
      localVue,
      beforeCreate () {
        this._router = mockedRouter;
      },
      propsData: {
        items
      }
    });
    const link = wrapper.find('#link-home');
    link.trigger('click');
    expect(pushStub).to.be.calledWith('/');
  });
});
