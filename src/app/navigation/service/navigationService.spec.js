let navService;

const routesInjector = require('inject-loader!./navigationService');
const sandbox = sinon.sandbox.create();
describe('nav service', () => {
  beforeEach(() => {
    navService = routesInjector({
      '@/app': {
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
      }
    });
  });
  afterEach(() => {
    sandbox.restore();
  });
  describe('get all nav links', () => {
    it('should return an array of navigation links', () => {
      const result = navService.getAllNavLinks();
      console.log(JSON.stringify(result));
      result.forEach(nav => {
        expect(Object.keys(nav)).to.include.members(['title', 'path', 'icon', 'shown']);
        expect(Object.keys(nav).length).to.equal(4);
      });
    });
  });
  describe('get shown links', () => {
    it('should return all of the shown links', () => {
      const links = Object.assign([], navService.getAllNavLinks());
      const result = navService.fetchShownLinks(links);
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
  describe('filter links', () => {
    describe('user logged in', () => {

    });
  });
});
