import NavToolbar from './NavToolbar';
import NavBus from '../service/navBus';
import { createLocalVue, mount, shallow } from 'vue-test-utils';
import firebase from 'firebase';
import authTypes from '@/app/uiComponents/auth/vuex/types';
import Vuex from 'vuex';

const sandbox = sinon.sandbox.create();
describe('NavToolbar.vue', () => {
  let emitStub, store, state, getters, actions, localVue, logOutStub, propsData, pushStub, mockedRouter, signOutStub, authStub;
  beforeEach(() => {
    propsData = { hasLinks: true };
    emitStub = sandbox.stub(NavBus, '$emit');
    signOutStub = sandbox.stub();
    authStub = sandbox.stub(firebase, 'auth');
    authStub.returns({
      signOut: signOutStub
    });
    actions = {};
    getters = {};
    logOutStub = sandbox.stub();
    pushStub = sandbox.stub();
    mockedRouter = { push: pushStub };
    getters[authTypes.getters.isLoggedIn] = sandbox.stub().returns(true);
    actions[authTypes.actions.logIn] = sandbox.stub();
    actions[authTypes.actions.logOut] = logOutStub;
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
  });
  afterEach(() => {
    sandbox.restore();
  });
  it('should contain the page title in the toolbar', () => {
    const wrapper = shallow(NavToolbar, {
      localVue,
      store,
      propsData
    });
    const title = wrapper.find('.white--text');
    expect(title.text()).to.equal('Spend Lyte');
  });
  it('should emit an event when the button is clicked', () => {
    const wrapper = mount(NavToolbar, {
      localVue,
      store,
      propsData
    });
    const button = wrapper.find('#toggleNavDrawerButton');
    button.trigger('click');
    expect(emitStub).to.be.calledOnce;
    expect(emitStub).to.be.calledWith('toggle_drawer_button_clicked');
  });
 /* it('should dispatch log out when log out is clicked', () => {
    const wrapper = mount(NavToolbar, {
      localVue,
      store,
      propsData,
      beforeCreate () {
        this._router = mockedRouter;
      }
    });
    const triggerMenu = wrapper.find('#openSignOutMenu');
    triggerMenu.trigger('click');
    const signOutButton = wrapper.find('#clickSignOut');
    signOutButton.trigger('click');
    expect(logOutStub).to.be.calledOnce;
  });*/
  it('should trigger a logout from firebase when the logout button is clicked', () => {
    const wrapper = mount(NavToolbar, {
      localVue,
      store,
      propsData,
      beforeCreate () {
        this._router = mockedRouter;
      }
    });
    const triggerMenu = wrapper.find('#openSignOutMenu');
    triggerMenu.trigger('click');
    const signOutButton = wrapper.find('#clickSignOut');
    signOutButton.trigger('click');
    expect(signOutStub).to.be.calledOnce;
  });
});
