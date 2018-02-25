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
export const mapDocument = doc => Object.assign({ id: doc.id }, doc.data());

export const mapCollection = collection => collection.docs.map(element => mapDocument(element));

export const fetchMappedCollection = async path => {
  const result = await fetchCollection(path);
  if (result.error) return result;
  console.log();
  console.log('docs', result.docs);
  return mapCollection(result);
};

export const fetchCollection = async (path:string): Promise<Array<any>> => {
  console.log('attempting to fetch collection at', path);
  try {
    const result = await firebase.firestore().collection(path).get();
    console.log('item assumed fetched successfully, response:', result);
    return result;
  } catch (e) {
    console.warn('an error occurred while fetching data', e);
    return { error: e };
  }
};
export const fetchCollectionListener = (path: string, collectionUpdated: Function) => firebase.firestore().collection(path).onSnapshot(collectionUpdated);

export const cleanItem = (item: Object) => {
  for (const propName in item) {
    if (item[propName] === null || item[propName] === undefined) {
      delete item[propName];
    }
  }
  return item;
};

export const handleSnapshotUpdate = (querySnapshot: any) => {
  const results = [];
  querySnapshot.forEach(doc => {
    results.push(Object.assign({ id: doc.id }, doc.data()));
  });
  return results;
};
