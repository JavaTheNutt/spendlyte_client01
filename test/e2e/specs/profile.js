import { expect } from 'chai';
import VueSelector from 'testcafe-vue-selectors';
import { Selector } from 'testcafe';
import { logIn, openAddGroupDialog } from '../util/uiUtils';
// import { getLocation } from '../util/browserUtils';
import { addUser } from '../util/firebaseAuth';
const currentDate = new Date();
const currentTimestamp = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getTime()}`;

fixture `test profile page`.page(`http://localhost:${process.env.PORT}`).before(async t => await addUser());

test('toggle add group dialog', async t => {
  await logIn(t);
  await t.takeScreenshot(`profile-page-${currentTimestamp}.png`);
  const openAddGroupDialogButton = Selector('#openAddGroupDialog');
  expect(await openAddGroupDialogButton.exists);
  await t.click(openAddGroupDialogButton);
  const addGroupDialog = VueSelector('add-group-form-dialog-adapter');
  expect(await addGroupDialog.exists).to.be.true;
  await t.takeScreenshot(`add-group-dialog-${currentTimestamp}.png`);
  const closeButton = Selector('#closeButton');
  expect(await closeButton.exists).to.be.true;
  await t.click(closeButton);
  expect(await addGroupDialog.exists).to.be.false;
});

test('validation', async t => {
  await logIn(t);
  await openAddGroupDialog(t);
  await t.typeText('#groupNameField', 'F')
    .takeScreenshot(`invalid-add-group-${currentTimestamp}.png`)
    .typeText('#groupNameField', 'amily')
    .takeScreenshot(`valid-add-group-${currentTimestamp}.png`)
    .click('#submitButton')
    .takeScreenshot(`trusted-device-dialog-${currentTimestamp}.png`);
});
