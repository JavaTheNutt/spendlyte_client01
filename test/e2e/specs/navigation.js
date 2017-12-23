import { expect } from 'chai';
import VueSelector from 'testcafe-vue-selectors';
import { Selector, ClientFunction } from 'testcafe';

fixture `test navigation`.page(`http://localhost:${process.env.PORT}`);

const openDrawer = async t => {
  const toggleDrawerButton = VueSelector('nav-toolbar v-toolbar v-btn');
  const navDrawer = VueSelector('navigation-drawer');
  await t.click(toggleDrawerButton);
  return navDrawer;
};
test('toggle open close drawer', async t => {
  const navData = await openDrawer(t);
  let navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.true;
  const sideNavFooter = Selector('#sideNavFooter');
  await t.click(sideNavFooter);
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
});

test('navigate', async t => {
  let navData = await openDrawer(t);
  const profileLink = Selector('#link-Profile');
  await t.click(profileLink);
  const getLocation = ClientFunction(() => document.location.href);
  expect(await getLocation()).contains('/profile');
  let navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
  navData = await openDrawer(t);
  const homeLink = Selector('#link-Home');
  await t.click(homeLink);
  const loc = await getLocation();
  expect(loc[loc.length - 1]).equals('/');
  navDrawerVue = await navData.getVue();
  expect(navDrawerVue.state.shown).to.be.false;
});
