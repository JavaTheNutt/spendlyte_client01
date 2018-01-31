// @flow
import firebase from 'firebase/app';
import 'firebase/firestore';

export const addItem = async (path:string, item: any) => {
  console.debug('adding', item, 'to', path);
  try {
    const result = await firebase.firestore().collection(path).add(item);
    console.debug('item assumed added successfully, response:', result);
    return result;
  } catch (e) {
    console.warn('an error occurred while fetching data', e);
    return { error: e };
  }
};

export const cleanItem = (item: Object) => {
  for (const propName in item) {
    if (item[propName] === null || item[propName] === undefined) {
      delete item[propName];
    }
  }
  return item;
};

