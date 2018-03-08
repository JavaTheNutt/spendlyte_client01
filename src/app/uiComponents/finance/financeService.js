import { fetchId } from '@/app/service/auth/authService';
import { fetchMappedCollection } from '@/app/data/firestore/util';
import Bus from '@/app/events/bus';

export const fetchBaseIncomes = async () => {
  const result = await getBaseIncomes();
  showSnack(result, 'income');
  return result;
};

export const fetchBaseExpenditures = async () => {
  const result = await getBaseExpenditures();
  showSnack(result, 'income');
  return result;
};

export const fetchBaseTransactions = async () => {
  const result = await getBaseTransactions();
  showSnack(result, 'income');
  return result;
};

const getBaseExpenditures = async () => {
  console.log('fetching base expenditure records');
  const result = await fetchMappedCollection(`transactions/${fetchId().data}/expenditures`);
  return result.error ? [] : mapTransactionTypeCollection(result, 'Expenditure');
};

const getBaseIncomes = async () => {
  console.log('fetching base income records');
  const result = await fetchMappedCollection(`transactions/${fetchId().data}/incomes`);
  return result.error ? [] : mapTransactionTypeCollection(result, 'Income');
};

const getBaseTransactions = async () => (await getBaseIncomes()).concat(await getBaseExpenditures());

const showSnack = (result, type) => {
  const msg = `${result.length} ${type || ''} records fetched`;
  const snackDetails = result.length > 0
  ? { msg, status: 'success' }
  : { msg: 'no records fetched', status: 'error' };
  Bus.$emit('show-snack', snackDetails.msg, snackDetails.msg);
};

export const mapTransactionTypeCollection = (list, type) => list.map(elem => mapTransactionType(elem, type));

export const mapTransactionType = (elem, type) => Object.assign({ type }, elem);
