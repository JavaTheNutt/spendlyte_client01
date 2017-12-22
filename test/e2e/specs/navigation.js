import {expect} from 'chai';
import VueSelector from 'testcafe-vue-selectors';

fixture `test navigation`.page(`http://localhost:${process.env.PORT}`);

test('open drawer', async t => {
  const toggleDrawerButton = VueSelector('nav-toolbar v-toolbar v-btn');
  const navDrawer = VueSelector('navigation-drawer');
  await t.click(toggleDrawerButton);
  const navDrawerVue = await navDrawer.getVue();
  expect(navDrawerVue.state.shown).to.be.true;
});
