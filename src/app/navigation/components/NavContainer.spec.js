import NavContainer from './NavContainer';
import NavToolbar from './NavToolbar';
import NavDrawer from './NavDrawer';
import NavBus from '../service/navBus';
import authTypes from '@/app/auth/vuex/types';
import Vuex from 'vuex';
import { createLocalVue, mount, shallow } from 'vue-test-utils';

//fixme test watchers
const sandbox = sinon.sandbox.create();
describe('NavContainer.vue', () => {
  let toggleSpy, emitStub, store, state, getters, actions, localVue, loggedInStub;
  beforeEach(() => {
    actions = {};
    getters = {};
    loggedInStub = sandbox.stub().returns(true);
    getters[authTypes.getters.isLoggedIn] = loggedInStub;
    actions[authTypes.actions.logIn] = sandbox.stub();
    actions[authTypes.actions.logOut] = sandbox.stub();
    state = {
      namespaced: true,
      modules: {
        auth: {
          state: {
            loggedIn: true
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
    wrapper.setData({
      navLinks: [{
        title: 'Home',
        icon: 'home',
        path: '/home',
        shown: true
      }, {
        title: 'contact',
        icon: 'supervisor_account',
        path: '/fake',
        shown: true
      }]
    });
    const toolbar = wrapper.find(NavToolbar);
    const button = toolbar.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
    expect(toggleSpy).to.be.calledOnce;
  });
  it('should set "hasNavLinks" to false when there are no nav links', () => {
    const wrapper = shallow(NavContainer, {
      localVue,
      store
    });
    wrapper.setData({
      navLinks: []
    });
    expect(wrapper.vm.hasLinks).to.be.false;
  });
  it('should set "hasNavLinks" to true when there are nav links', () => {
    const wrapper = shallow(NavContainer, {
      localVue,
      store
    });
    wrapper.setData({
      navLinks: [{
        title: 'Home',
        icon: 'home',
        path: '/home',
        shown: true
      }, {
        title: 'contact',
        icon: 'supervisor_account',
        path: '/fake',
        shown: true
      }]
    });
    expect(wrapper.vm.hasLinks).to.be.true;
  });
});
