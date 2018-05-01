import format from 'date-fns/format';
export const longDateFilter = value => {
  if (!value) return undefined;
  const splitDate = value.split('-');
  return format(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]), 'dddd Do MMMM, YYYY');
};

export const titleCaseString = value => {
  if (!value) return undefined;
  value = value.trim();
  return value.split(' ')
  .map(word => `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`)
    .map(word => abbreviationCheck(word))
    .join(' ').trim();
};

const abbreviationCheck = value => value.indexOf('.') !== -1 ? value.split('.').join('').toUpperCase() : value;

