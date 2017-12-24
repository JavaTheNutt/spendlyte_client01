const routesInjector = require('inject-loader!./navigationService');
const sandbox = sinon.sandbox.create();
const fakeRoutes = {
  routeMeta: [{
    title: 'Home',
    icon: 'home',
    path: '/home',
    shown: true
  }, {
    title: 'Fake',
    icon: 'supervisor_account',
    path: '/fake',
    shown: false
  }]
};
const navServiceLoggedIn = routesInjector({
  '@/app': fakeRoutes,
  '@/store': {
    state: {
      auth: {
        loggedIn: true
      }
    }
  }
});
const navServiceLoggedOut = routesInjector({
  '@/app': fakeRoutes,
  '@/store': {
    state: {
      auth: {
        loggedIn: false
      }
    }
  }
});
describe('nav service', () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('no auth', () => {
    describe('get all nav links', () => {
      it('should return an array of navigation links', () => {
        const result = navServiceLoggedIn.getAllNavLinks();
        result.forEach(nav => {
          expect(Object.keys(nav)).to.include.members(['title', 'path', 'icon', 'shown']);
          expect(Object.keys(nav).length).to.equal(4);
        });
      });
    });
    describe('get shown links', () => {
      it('should return all of the shown links', () => {
        const links = Object.assign([], navServiceLoggedIn.getAllNavLinks());
        const result = navServiceLoggedIn.fetchShownLinks(links);
        result.forEach(link => {
          expect(link).to.not.eql({
            title: 'Fake',
            icon: 'supervisor_account',
            path: '/fake',
            shown: 'false'
          });
        });
      });
    });
  });
  describe('filter links', () => {
    describe('user logged in', () => {
      it('should return all links', () => {
        const result = navServiceLoggedIn.getAuthorizedRoutes();
        expect(result).to.eql(fakeRoutes.routeMeta);
      });
    });
    describe('user logged out', () => {
      it('should only return the links that have shown set to true', () => {
        const result = navServiceLoggedOut.getAuthorizedRoutes();
        expect(result).to.eql([{
          title: 'Home',
          icon: 'home',
          path: '/home',
          shown: true
        }]);
      });
    });
  });
});
