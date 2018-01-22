// @flow
import * as firestoreService from '@/app/data/firestore/util';
export const addGroup = async (data : {name: string, description: ?string}) => {
  const result = await firestoreService.addItem('groups', data);
  console.debug('result of write operation: ', result);
  if (result.error) console.warn('error writing group to firestore', result.error);
  return result;
};
