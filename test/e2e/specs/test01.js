import {expect} from 'chai';
import VueSelector from 'testcafe-vue-selectors';

fixture `fixture fix test test`.page(`http://localhost:${process.env.PORT}`);

test('root test', async t => {
  const app = VueSelector('v-app v-footer');
  expect(await app.innerText).to.have.string('2017');
});
