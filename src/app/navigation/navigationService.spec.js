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
});
