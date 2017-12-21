import NavToolbar from './NavToolbar';

import { shallow } from 'vue-test-utils';

describe('NavToolbar.vue', () => {
  it('should contain the page title in the toolbar', ()=>{
    const wrapper = shallow(NavToolbar);
    const title = wrapper.find('.white--text');
    expect(title.text()).to.equal('Spend Lyte');
  });
});
