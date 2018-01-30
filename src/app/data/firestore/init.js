import firebase from 'firebase/app';
import 'firebase/firestore';

export const enableFirestorePersistence = async () => {
  console.log('enabling firebase offline persistence');
  await firebase.firestore().enablePersistence();
};

