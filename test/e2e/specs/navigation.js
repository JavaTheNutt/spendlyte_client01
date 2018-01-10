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

test('navigate visually', async t => {
  await logIn(t);
  const navData = await openDrawer(t);
  await t.takeScreenshot(`nav-open-profile-${currentTimestamp}.png`);
  await t.click('#link-Home')
  .takeScreenshot(`nav-open-home-${currentTimestamp}.png`);
  const loc = await getLocation();
  expect(loc[loc.length - 1]).equals('/');
  let navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
  await openDrawer(t);
  await t.click('#link-Profile');
  expect(await getLocation()).contains('/profile');
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
  await openDrawer(t);
  await t.click('#link-About');
  expect(await getLocation()).contains('/about');
  await t.takeScreenshot(`about-page-${currentTimestamp}.png`);
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
});

// fixme: this test fails, navigation via url seems to break it.
/* test('navigate by url', async t => {
  await logIn(t);
  console.log(await getLocation())
  const currentLocation = await getLocation();
  const newUrl = `${currentLocation.substring(0, currentLocation.lastIndexOf('/'))}/about`;
  await t.navigateTo(newUrl);
  expect(await getLocation()).contains('/profile');
  const aboutComponent = VueSelector('profile');
  expect(await aboutComponent.exists);
});*/
