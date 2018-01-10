import Home from './Home';

import { shallow } from 'vue-test-utils';

describe('Home.vue', () => {
  it('should display the correct title', () => {
    const wrapper = shallow(Home);
    const header = wrapper.find('#jumbotronTitle');
    expect(header.text()).to.equal('Welcome to Spend Lyte');
  });
  it('should display the correct subtitle', () => {
    const wrapper = shallow(Home);
    const header = wrapper.find('#jumbotronSubtitle');
    expect(header.text()).to.equal('The only finance app you\'ll ever need!');
  });
  it('should display the correct information', () => {
    const wrapper = shallow(Home);
    const header = wrapper.find('#jumbotronInfoMessage');
    expect(header.text()).to.equal('Read a little bit about this application');
  });
});
