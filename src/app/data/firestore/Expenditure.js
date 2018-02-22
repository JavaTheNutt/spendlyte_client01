// @flow
import { addItem } from './util';
import firebase from 'firebase/app';
import 'firebase/auth';
import Finance from './Finance';
import Bus from '@/app/events/bus';

export default class Expenditure extends Finance {
  // fixme add id field for fetching data
  async save () {
    try {
      const result = await addItem(`transactions/${getUserId()}/incomes`, this.toJson());
      Bus.$emit('show-snack', `${this.title} transaction added successfully`);
      return result;
    } catch (error) {
      console.log('an error has occurred', error);
      Bus.$emit('show-snack', 'Error adding income', 'error');
      return false;
    }
  }
}

const getUserId = () => firebase.auth().currentUser.uid;
