import admin from 'firebase-admin';
export const addUser = async() => {
  try {
    const user = await admin.auth().getUserByEmail('root@root.com');
    if (!user) {
      await
        admin.auth().createUser({
          email: 'root@root.com',
          password: 'wwwwww'
        });
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async() => {
  try {
    const user = await admin.auth().getUserByEmail('iamtheuserthatisusedforacceptancetests@test.com');
    if (user) await admin.auth().deleteUser(user.uid);
  } catch (e) {
    console.log(e);
  }
};

