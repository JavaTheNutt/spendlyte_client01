import * as firebaseAuthUtils from './firebaseAuth';
import { Selector } from 'testcafe';

export const logIn = async t => {
  await firebaseAuthUtils.addUser();
  await openLoginDialog(t);
  await t.typeText('#emailField', 'test_user@test.com');
  await t.typeText('#passwordField', 'wwwwww');
  const submitButton = Selector('#submitButton');
  await t.click(submitButton);
  await t.wait(2000);
};

export const openLoginDialog = async t => {
  const loginButton = Selector('#loginButton');
  await t.click(loginButton);
};

export const openAddGroupDialog = async t => {
  const openAddGroupDialogButton = Selector('#openAddGroupDialog');
  // expect(await openAddGroupDialogButton.exists);
  await t.click(openAddGroupDialogButton);
};
