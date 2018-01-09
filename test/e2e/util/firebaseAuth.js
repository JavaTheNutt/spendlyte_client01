import admin from 'firebase-admin';
export const addUser = async() => {
  try {
    const user = await admin.auth().getUserByEmail('test_user@test.com');
    if (!user) {
      await
        admin.auth().createUser({
          email: 'test_user@test.com',
          password: 'wwwwww'
        });
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async() => {
  try {
    const user = await admin.auth().getUserByEmail('test_user@test.com');
    if (user) await admin.auth().deleteUser(user.uid);
  } catch (e) {
    console.log(e);
  }
};

