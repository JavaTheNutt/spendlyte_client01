import Bus from '@/app/events/bus';

export const handleHttpResponse = response => {
  if (response.status !== 200) return Bus.$emit('show-snack', 'an error occurred while fetching data', 'error');
  const message = Array.isArray(response.data)
    ? `${response.data.length} records fetched`
    : 'data fetched successfully';
  return Bus.$emit('show-snack', message, 'success');
};
