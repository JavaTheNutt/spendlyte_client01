import { http } from '@/http';
import { fetchHeaders } from '@/http/util';

export const fetchAllIncomes = async () => {
  console.log('making request to fetch all incomes');
  const headers = await fetchHeaders();
  console.log('headers', headers.data);
  const response = await http.get('/income', { headers: headers.data });
  console.log('response', response);
  return response;
};
