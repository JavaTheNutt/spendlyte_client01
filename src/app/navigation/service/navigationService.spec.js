import * as navService from './navigationService';

const sandbox = sinon.sandbox.create();
describe('nav service', () => {
  afterEach(() => {
    sandbox.restore();
  });
  describe('get all nav links', () => {
    it('should return an array of navigation links', () => {
      const result = navService.getAllNavLinks();
      result.forEach(nav => {
        expect(Object.keys(nav)).to.include.members(['title', 'route', 'icon', 'shown']);
        expect(Object.keys(nav).length).to.equal(4);
      });
    });
  });
  describe('get shown links', () => {
    it('should return all of the shown links', () => {
      const links = Object.assign([], navService.getAllNavLinks());
      const fakeLink = {
        title: 'fake',
        route: '/fake',
        icon: 'fake',
        shown: false
      };
      links.push(fakeLink);
      const result = navService.fetchShownLinks(links);
      result.forEach(link => {
        expect(link).to.not.eql(fakeLink);
      });
    });
  });
  /* describe('fetch side nav links', () => {
    it('should return the nav links that have shown = true', () => {
      const fetchLinksStub = sandbox.stub(navService, 'getAllNavLinks');
      fetchLinksStub.returns([{
        title: 'home',
        route: '/',
        icon: 'home',
        shown: true
      }, {
        title: 'fake',
        route: '/fake',
        icon: 'fake',
        shown: false
      }]);
      const result = navService.fetchSideNavLinks();
      expect(result).to.eql([{
        title: 'home',
        route: '/',
        icon: 'home',
        shown: true
      }]);
    });
  });*/
});
