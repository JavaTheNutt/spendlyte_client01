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
  describe('mapDocument', () => {
    let fakeDoc;
    beforeEach(() => {
      fakeDoc = {
        id: 'someidhere',
        data () {
          return {
            somekey: 'somevalue',
            someotherkey: 'someothervalue'
          };
        }
      };
    });
    it('should correctly map a document', () => {
      const result = firestoreUtils.mapDocument(fakeDoc);
      expect(result).to.eql({ id: 'someidhere', somekey: 'somevalue', someotherkey: 'someothervalue' });
    });
  });
  describe('mapCollection', () => {
    let fakeCollection;
    beforeEach(() => {
      fakeCollection = {
        docs: [{
          id: 'someidhere',
          data () {
            return {
              somekey: 'somevalue',
              someotherkey: 'someothervalue'
            };
          }
        }, {
          id: 'somesecondidhere',
          data () {
            return {
              somekey: 'somesecondvalue',
              someotherkey: 'someothersecondvalue'
            };
          }
        }]
      };
    });
    it('should correctly map a collection', () => {
      const result = firestoreUtils.mapCollection(fakeCollection);
      expect(result).to.eql([{ id: 'someidhere', somekey: 'somevalue', someotherkey: 'someothervalue' }, { id: 'somesecondidhere', somekey: 'somesecondvalue', someotherkey: 'someothersecondvalue' }]);
    });
  });
});
