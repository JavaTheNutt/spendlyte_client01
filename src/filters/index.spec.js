import { longDateFilter, titleCaseString } from './index';

describe('filters', () => {
  describe('longDateFilter', () => {
    it('should format a date correctly', () => {
      const date = '2018-02-19';
      const result = longDateFilter(date);
      expect(result).to.equal('Monday 19th February, 2018');
    });
  });
  describe('titleCaseString', () => {
    it('should correctly title case a string', () => {
      const testString = 'i Am a poorly Constructed sTRING';
      const result = titleCaseString(testString);
      expect(result).to.equal('I Am A Poorly Constructed String');
    });
    it('should handle abbreviations correctly', () => {
      const testString = 'soccer club a.G.m';
      const result = titleCaseString(testString);
      expect(result).to.equal('Soccer Club AGM');
    });
  });
});
