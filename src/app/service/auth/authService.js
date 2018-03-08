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

export const fetchId = async () => {
  console.log('fetching current id');
  const user = await getUser();
  console.log('result of user fetch', user);
  if (!user || !user.uid) return { success: false, msg: 'user is not signed in' };
  return { success: true, data: user.uid };
};

export const getUser = async () => {
  console.log('attempting to get user');
  let i = 0;
  while (true) {
    console.log('attempt #', i);
    const user = firebase.auth().currentUser;
    if (user) return user;
    console.log('user not found');
    await new Promise(resolve => {
      setTimeout(() => {
        i++;
        console.log('timeout triggered');
        resolve();
      }, 50);
    });
    if (i > 9) return false;
    console.log('restarting loop');
  }
};
