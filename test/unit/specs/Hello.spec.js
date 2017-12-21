import Hello from '@/components/Hello';
import { shallow } from 'vue-test-utils';

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(Hello);
    expect(wrapper.text()).to.contain('First, solve the problem. Then, write the code');
  });
});
