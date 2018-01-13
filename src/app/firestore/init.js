import firebase from 'firebase';

const _db = null;

export const getDb = async () => {
  if (_db) {
    return _db;
  }
 // FIXME: implement _db creation
};
