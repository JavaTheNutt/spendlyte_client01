import { http } from '@/http';
import { fetchHeaders } from '@/http/util';

export const fetchAllFutureIncomes = async (num = 1, skip = 0) => {
  console.log('making request to fetch all incomes');
  const headers = await fetchHeaders();
  console.log('headers', headers.data);
  const params = new URLSearchParams();
  params.append('num', num);
  params.append('skip', skip);
  const response = await http.get('/income', { headers: headers.data, params });
  console.log('response', response);
  return response;
};

export const fetchAllFutureExpenditures = async (num = 1, skip = 0) => {
  console.log('making request to fetch all incomes');
  const headers = await fetchHeaders();
  console.log('headers', headers.data);
  const params = new URLSearchParams();
  params.append('num', num);
  params.append('skip', skip);
  const response = await http.get('/expenditure', { headers: headers.data, params });
  console.log('response', response);
  return response;
};
export const fetchAllFutureTransactions = async (num = 1, skip = 0) => {
  console.log('making request to fetch all incomes');
  const headers = await fetchHeaders();
  console.log('headers', headers.data);
  const params = new URLSearchParams();
  params.append('num', num);
  params.append('skip', skip);
  const response = await http.get('/all', { headers: headers.data, params });
  console.log('response', response);
  return response;
};
