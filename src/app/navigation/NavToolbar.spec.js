import NavToolbar from './NavToolbar';
import NavBus from './navBus';
import { createLocalVue, mount, shallow } from 'vue-test-utils';
import authTypes from '@/app/auth/vuex/types';
import Vuex from 'vuex';

const sandbox = sinon.sandbox.create();
describe('NavToolbar.vue', () => {
  let emitStub, store, state, getters, actions, localVue;
  beforeEach(() => {
    emitStub = sandbox.stub(NavBus, '$emit');
    actions = {};
    getters = {};
    getters[authTypes.getters.isLoggedIn] = sandbox.stub();
    actions[authTypes.actions.logIn] = sandbox.stub();
    actions[authTypes.actions.logOut] = sandbox.stub();
    state = {
      namespaced: true,
      modules: {
        auth: {
          state: {
            loggedIn: false
          },
          getters,
          actions
        }
      }
    };
    localVue = createLocalVue();
    localVue.use(Vuex);
    store = new Vuex.Store(state);
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should contain the page title in the toolbar', () => {
    const wrapper = shallow(NavToolbar, {
      localVue,
      store
    });
    const title = wrapper.find('.white--text');
    expect(title.text()).to.equal('Spend Lyte');
  });
  it('should emit an event when the button is clicked', () => {
    const wrapper = mount(NavToolbar, {
      localVue,
      store
    });
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
  });
});
