import { http } from '@/http';
import firebase from 'firebase';

export const fetchAllIncomes = async () => {
  console.log('making request to fetch all incomes');
  const response = await http.get('/income', {
    headers: {
      Authorization: `Bearer ${await firebase.auth().currentUser.getIdToken(true)}`
    }
  });
  console.log('response', response);
  return response;
};
