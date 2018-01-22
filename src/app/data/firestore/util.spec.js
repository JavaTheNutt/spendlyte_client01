/* global describe*/
/* global it*/
import firebase from 'firebase';
import * as firestoreUtils from './util';

const sandbox = sinon.sandbox.create();
describe('util.js', () => {
  let firestoreStub, collectionStub, addStub;
  beforeEach(() => {
    firestoreStub = sandbox.stub(firebase, 'firestore');
    collectionStub = sandbox.stub();
    addStub = sandbox.stub();
    firestoreStub.returns({ collection: collectionStub });
    collectionStub.returns({ add: addStub });
  });
  afterEach(() => sandbox.restore());
  describe('addItem', () => {
    it('should return the object returned by firebase', async () => {
      addStub.resolves({ id: 'someidhere', name: 'something' });
      const someItem = { name: 'something' };
      const result = await firestoreUtils.addItem('group/anid', someItem);
      expect(result).to.eql({ id: 'someidhere', name: 'something' });
    });
    it('should handle errors gracefully', async () => {
      const err = new Error('I am an error');
      addStub.throws(err);
      const someItem = { name: 'something' };
      const result = await firestoreUtils.addItem('group/anid', someItem);
      expect(result).to.eql({ error: err });
    });
  });
});
