import Home from './Home';

import { shallow } from 'vue-test-utils';

describe('Home.vue', () => {
  it('should display the correct title', () => {
    const wrapper = shallow(Home);
    const header = wrapper.find('.text-xs-center');
    expect(header.text()).to.equal('Welcome to Spend Lyte!');
  });
});
