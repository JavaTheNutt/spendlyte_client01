import { expect } from 'chai';
import VueSelector from 'testcafe-vue-selectors';
import { Selector } from 'testcafe';
import { logIn } from '../util/uiUtils';
import { getLocation } from '../util/browserUtils';
import { addUser } from '../util/firebaseAuth';
const currentDate = new Date();
const currentTimestamp = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getTime()}`;
console.log('currentTimestamp', currentTimestamp);

fixture `test navigation`.page(`http://localhost:${process.env.PORT}`).before(async t => await addUser());

const openDrawer = async t => {
  const toggleDrawerButton = Selector('#toggleNavDrawerButton');
  const navDrawer = VueSelector('navigation-drawer');
  await t.click(toggleDrawerButton);
  return navDrawer;
};

test('toggle open close drawer', async t => {
  await logIn(t);
  const navData = await openDrawer(t);
  let navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.true;
  const sideNavFooter = Selector('#sideNavFooter');
  await t.click(sideNavFooter);
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
});

test('navigate', async t => {
  await logIn(t);
  const navData = await openDrawer(t);
  await t.takeScreenshot(`nav-open-profile-${currentTimestamp}.png`);
  const homeLink = Selector('#link-Home');
  await t.click(homeLink)
  .takeScreenshot(`nav-open-home-${currentTimestamp}.png`);
  const loc = await getLocation();
  expect(loc[loc.length - 1]).equals('/');
  let navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
  await openDrawer(t);
  const profileLink = Selector('#link-Profile');
  await t.click(profileLink);
  expect(await getLocation()).contains('/profile');
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
});
