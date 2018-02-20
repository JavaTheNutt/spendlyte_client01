import { longDateFilter } from './index';

describe('filters', () => {
  describe('longDateFilter', () => {
    it('should format a date correctly', () => {
      const date = '2018-02-19';
      const result = longDateFilter(date);
      expect(result).to.equal('Monday 19th February, 2018');
    });
  });
});
