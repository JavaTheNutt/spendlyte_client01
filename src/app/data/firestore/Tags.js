import { mapDocument } from './util';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { fetchId } from '../../service/auth/authService';

export const fetchTags = async () => {
  console.log('attempting to fetch all tags');
  const customTagString = `tags/${(await fetchId()).data}`;
  console.log('custom tag string', customTagString);
  const publicTags = Object.keys(mapDocument(await firebase.firestore().doc('tags/public').get())).filter(tag => tag !== 'id');
  const userTags = Object.keys(mapDocument(await firebase.firestore().doc(customTagString).get())).filter(tag => tag !== 'id');
  console.log('public tags fetched', publicTags);
  console.log('user tags fetched', userTags);
  return { success: true, data: { global: publicTags, user: userTags }};
};
