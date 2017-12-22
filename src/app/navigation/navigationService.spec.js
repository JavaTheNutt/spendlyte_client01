import * as navService from './navigationService';

describe('nav service', () => {
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
      const links = navService.getAllNavLinks();
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
});
