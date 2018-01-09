import { expect } from 'chai';
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';
import admin from 'firebase-admin';
const strippedKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
/* fixme: Error: Credential implementation provided to initializeApp() via the "credential" property failed to fetch a
   valid Google OAuth2 access token with the following error: "Error fetching access token: invalid_client (The
   OAuth client was not found.)"
   Need to add rest of properties from key?*/
admin.initializeApp({
  credential: admin.credential.cert({
    'type': process.env.FIREBASE_TYPE,
    'project_id': process.env.FIREBASE_PROJECT_ID,
    'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
    'private_key': strippedKey,
    'client_email': process.env.FIREBASE_CLIENT_EMAIL,
    'client_id': process.env.FIREBASE_CLIENT_ID,
    'auth_uri': process.env.FIREBASE_AUTH_URI,
    'token_uri': process.env.FIREBASE_TOKEN_URI,
    'auth_provider_x509_cert_url': process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    'client_x509_cert_url': process.env.FIREBASE_CLIENT_X509_CERT_URL
  }),
  databaseURL: JSON.stringify(process.env.FIREBASE_DATABASE_URL)
});
fixture `test authentication`.page(`http://localhost:${process.env.PORT}`);

test('log in', async t => {
  await openLoginDialog(t);
  const emailField = Selector('#emailField');
  expect(await emailField.exists).to.be.true;
  await t.typeText('#emailField', 'root@root.com');
  const passwordField = Selector('#passwordField');
  expect(await passwordField.exists).to.be.true;
  await t.typeText('#passwordField', 'wwwwww');
  const submitButton = Selector('#submitButton');
  await t.click(submitButton);
  const loginForm = VueSelector('email-password-form');
  await t.wait(2000);
  expect(await loginForm.exists).to.be.false;
}).before(async t => {
  const user = await admin.auth().getUserByEmail('root@root.com');
  if (!user) await admin.auth().createUser({ email: 'root@root.com', password: 'wwwwww' });
});
test('sign up', async t => {
  await openLoginDialog(t);
  const emailField = Selector('#emailField');
  expect(await emailField.exists).to.be.true;
  await t.typeText('#emailField', 'iamtheuserthatisusedforacceptancetests@test.com');
  const passwordField = Selector('#passwordField');
  expect(await passwordField.exists).to.be.true;
  await t.typeText('#passwordField', 'wwwwww');
  const newAccountCheckbox = Selector('.material-icons.icon.icon--selection-control');
  expect(await newAccountCheckbox.exists).to.be.true;
  await t.click(newAccountCheckbox);
  const confirmPasswordField = Selector('#confirmPasswordField');
  expect(await confirmPasswordField.exists).to.be.true;
  await t.typeText(confirmPasswordField, 'wwwwww');
  const submitButton = Selector('#submitButton');
  await t.click(submitButton);
  const loginForm = VueSelector('email-password-form');
  await t.wait(2000);
  expect(await loginForm.exists).to.be.false;
}).before(async t => {
  const user = await admin.auth().getUserByEmail('iamtheuserthatisusedforacceptancetests@test.com');
  if (user) await admin.auth().deleteUser(user.uid);
});
async function openLoginDialog (t) {
  const loginButton = Selector('#loginButton');
  expect(await loginButton.exists).to.be.true;
  await t.click(loginButton);
  const loginForm = VueSelector('email-password-form');
  expect(await loginForm.exists).to.be.true;
};
