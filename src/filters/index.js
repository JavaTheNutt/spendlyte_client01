import format from 'date-fns/format';
export const longDateFilter = value => {
  if (!value) return undefined;
  const splitDate = value.split('-');
  return format(new Date(splitDate[0], splitDate[1] - 1, splitDate[2]), 'dddd Do MMMM, YYYY');
};
