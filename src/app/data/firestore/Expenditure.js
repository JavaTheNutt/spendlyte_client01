// @flow
import { addItem } from './util';
import firebase from 'firebase/app';
import 'firebase/auth';
import Finance from './Finance';

export default class Expenditure extends Finance {
  // fixme add id field for fetching data
  async save () {
    return await addItem(`transactions/${getUserId()}/expenditures`, this.toJson());
  }
}

const getUserId = () => firebase.auth().currentUser.uid;
