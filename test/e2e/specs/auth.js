import { expect } from 'chai';
import { Selector } from 'testcafe';

fixture `test authentication`.page(`http://localhost:${process.env.PORT}`);

test('log in/out ui', async t => {
  const loginButton = Selector('#loginButton');
  expect(await loginButton.exists).to.be.true;
  await t.click(loginButton);
  expect(await loginButton.exists).to.be.false;
  const logOutMenuButton = Selector('#openSignOutMenu');
  expect(await logOutMenuButton.exists).to.be.true;
  await t.click(logOutMenuButton);
  const signOutMenuEntry = Selector('#clickSignOut');
  expect(await signOutMenuEntry.exists).to.be.true;
  await t.click(signOutMenuEntry);
  expect(await logOutMenuButton.exists).to.be.false;
  expect(await signOutMenuEntry.exists).to.be.false;
});
