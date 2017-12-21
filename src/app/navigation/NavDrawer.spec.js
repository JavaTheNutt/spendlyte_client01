import NavDrawer from './NavDrawer';
import { shallow } from 'vue-test-utils';

describe('NavDrawer.vue', () => {
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
});
