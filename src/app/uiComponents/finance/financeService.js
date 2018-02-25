import { fetchId } from '@/app/service/auth/authService';
import { fetchMappedCollection } from '@/app/data/firestore/util';
import Bus from '@/app/events/bus';

export const fetchBaseIncomes = async () => {
  console.log('fetching base income records');
  const result = await fetchMappedCollection(`transactions/${fetchId()}/incomes`);
  if (result.error) {
    Bus.$emit('show-snack', 'failed to fetch base incomes', 'error');
    return [];
  }
  Bus.$emit('show-snack', `${result.length} income records fetched`, 'success');
  return result;
};
