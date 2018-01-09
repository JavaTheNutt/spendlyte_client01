import { expect } from 'chai';
import VueSelector from 'testcafe-vue-selectors';
import { Selector } from 'testcafe';
import { logIn } from '../util/uiUtils';
import { getLocation } from '../util/browserUtils';

fixture `test navigation`.page(`http://localhost:${process.env.PORT}`);

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
  const homeLink = Selector('#link-Home');
  await t.click(homeLink);
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
