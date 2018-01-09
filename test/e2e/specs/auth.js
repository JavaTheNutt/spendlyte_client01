import { expect } from 'chai';
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';
import * as firebaseUtil from '../util/firebaseAuth';

fixture `test authentication`.page(`http://localhost:${process.env.PORT}`);

test('log in', async t => {
  await openLoginDialog(t);
  const emailField = Selector('#emailField');
  expect(await emailField.exists).to.be.true;
  await t.typeText('#emailField', 'iamtheuserthatisusedforacceptancetests@test.com');
  const passwordField = Selector('#passwordField');
  expect(await passwordField.exists).to.be.true;
  await t.typeText('#passwordField', 'wwwwww');
  const submitButton = Selector('#submitButton');
  await t.click(submitButton);
  const loginForm = VueSelector('email-password-form');
  await t.wait(2000);
  expect(await loginForm.exists).to.be.false;
}).before(async t => await firebaseUtil.addUser());

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
}).before(async t => await firebaseUtil.deleteUser());

async function openLoginDialog (t) {
  const loginButton = Selector('#loginButton');
  expect(await loginButton.exists).to.be.true;
  await t.click(loginButton);
  const loginForm = VueSelector('email-password-form');
  expect(await loginForm.exists).to.be.true;
};
