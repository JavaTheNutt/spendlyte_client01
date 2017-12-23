import NavContainer from './NavContainer';
import NavToolbar from './NavToolbar';
import NavDrawer from './NavDrawer';
import NavBus from './navBus';
import authTypes from '@/app/auth/vuex/types';
import Vuex from 'vuex';
import { mount, shallow, createLocalVue } from 'vue-test-utils';

const sandbox = sinon.sandbox.create();
describe('NavContainer.vue', () => {
  let toggleSpy, emitStub, store, state, getters, actions, localVue;
  beforeEach(() => {
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
    emitStub = sandbox.spy(NavBus, '$emit');
    toggleSpy = sandbox.spy(NavDrawer.methods, 'toggleShown');
  });
  afterEach(() => sandbox.restore());
  it('should contain a toolbar', () => {
    const wrapper = shallow(NavContainer, {
      localVue,
      store
    });
    const toolbar = wrapper.find(NavToolbar);
    expect(toolbar.is(NavToolbar)).to.be.true;
  });
  it('should contain a drawer', () => {
    const wrapper = shallow(NavContainer, {
      localVue,
      store
    });
    const drawer = wrapper.find(NavDrawer);
    expect(drawer.is(NavDrawer)).to.be.true;
  });
  it('should handle events between child components correctly', () => {
    const wrapper = mount(NavContainer, {
      localVue,
      store
    });
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
    expect(toggleSpy).to.be.calledOnce;
  });
});
