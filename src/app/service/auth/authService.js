import firebase from 'firebase/app';
import 'firebase/auth';

export const fetchIdToken = async () => {
  console.log('request made to fetch ID token');
  try {
    const token = await firebase.auth().currentUser.getIdToken(true);
    console.log('token fetched');
    if (!token) return { success: false, msg: 'user does not exist' };
    return { success: true, data: token };
  } catch (error) {
    console.log('there was an error fetching the token');
    return { success: false, msg: 'there was an error fetching the token', error };
  }
};
