import {expect} from 'chai';
import VueSelector from 'testcafe-vue-selectors';

fixture `fixture fix test test`.page('http://localhost:8080');

test('root test', async t =>{
  const app = VueSelector('app');
  await expect(true).to.be.true;
})
