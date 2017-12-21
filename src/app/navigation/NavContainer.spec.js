import NavContainer from './NavContainer';
import NavToolbar from './NavToolbar';
import { shallow } from 'vue-test-utils';

describe('NavContainer.vue', () => {
  it('should contain a toolbar', () => {
    const wrapper = shallow(NavContainer);
    const toolbar = wrapper.find(NavToolbar);
    expect(toolbar.is(NavToolbar)).to.be.true;
  });
});
