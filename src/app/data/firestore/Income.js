// @flow
import { addItem } from './util';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class Income {
  // fixme add id field for fetching data
  constructor (title?: string, amount?: number, frequency?: string, nextDueDate?: Date) {
    this._title = title;
    this._amount = amount;
    this._frequency = frequency;
    this._nextDueDate = nextDueDate;
  }

  get title (): string {
    return this._title;
  }

  set title (value: string) {
    this._title = value;
  }

  get amount (): number {
    return this._amount;
  }

  set amount (value: number) {
    this._amount = value;
  }

  get frequency (): string {
    return this._frequency;
  }

  set frequency (value: string) {
    this._frequency = value;
  }

  get nextDueDate (): Date {
    return this._nextDueDate;
  }

  set nextDueDate (value: Date) {
    this._nextDueDate = value;
  }

  toJson () : {title: string, amount: number, frequency: string, nextDueDate: Date} {
    return {
      title: this._title,
      amount: this._amount,
      frequency: this._frequency,
      nextDueDate: this._nextDueDate
    };
  }

  async save () {
    return await addItem(`transactions/${getUserId()}/incomes`, this.toJson());
  }
}

const getUserId = () => firebase.auth().currentUser.uid;
