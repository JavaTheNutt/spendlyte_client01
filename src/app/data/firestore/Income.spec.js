/* global describe */
/* global it */
// import firebase from 'firebase/app';
const sandbox = sinon.sandbox.create();

import Income from './Income';
describe('Income firestore model', () => {
  afterEach(() => sandbox.restore());
  describe('constructor', () => {
    it('should create an object with all properties', () => {
      const income = new Income('wages', 2300, 'Monthly', '01-02-2018');
      expect(income.toJson()).to.eql({ title: 'wages', amount: 2300, frequency: 'Monthly', nextDueDate: '01-02-2018' });
    });
    it('should create an object with some properties', () => {
      const income = new Income('wages', null, null, '01-02-2018');
      expect(income.title).to.equal('wages');
      expect(income.amount).to.not.exist;
      expect(income.frequency).to.not.exist;
      expect(income.nextDueDate).to.equal('01-02-2018');
    });
  });
  describe('getters', () => {
    let income;
    beforeEach(() => income = new Income('wages', 2300, 'Monthly', '01-02-2018'));
    it('should fetch the title property', () => {
      expect(income.title).to.equal('wages');
    });
    it('should fetch the amount property', () => {
      expect(income.amount).to.equal(2300);
    });
    it('should fetch the nextDueDate property', () => {
      expect(income.nextDueDate).to.equal('01-02-2018');
    });
    it('should fetch the frequency property', () => {
      expect(income.frequency).to.equal('Monthly');
    });
  });
  describe('setters', () => {
    let income;
    beforeEach(() => income = new Income());
    it('should set the title property', () => {
      income.title = 'wages';
      expect(income.title).to.equal('wages');
    });
    it('should set the amount property', () => {
      income.amount = 2300;
      expect(income.amount).to.equal(2300);
    });
    it('should set the nextDueDate property', () => {
      income.nextDueDate = '01-02-2018';
      expect(income.nextDueDate).to.equal('01-02-2018');
    });
    it('should set the frequency property', () => {
      income.frequency = 'Monthly';
      expect(income.frequency).to.equal('Monthly');
    });
  });
  describe('toJson', () => {
    it('should return a proper JSON representation of the object with all properties', () => {
      const income = new Income('wages', 2300, 'Monthly', '01-02-2018');
      expect(income.toJson()).to.eql({ title: 'wages', amount: 2300, frequency: 'Monthly', nextDueDate: '01-02-2018' });
    });
    it('should strip the properties that do not exist', () => {
      const income = new Income('wages', null, null, '01-02-2018');
      console.log(income.toJson());
      expect(income.toJson()).to.eql({ title: 'wages', nextDueDate: '01-02-2018' });
    });
  });
  // fixme throws app not initialized error
  /* describe('save', () => {
    let firestoreStub, collectionStub, addStub, income;
    beforeEach(() => {
      firestoreStub = sandbox.stub(firebase, 'firestore');
      collectionStub = sandbox.stub();
      addStub = sandbox.stub();
      firestoreStub.returns({ collection: collectionStub });
      collectionStub.returns({ add: addStub });
      income = new Income('wages', 2300, 'monthly', '23-02-2018');
    });
    it('should handle errors appropriately', async () => {
      addStub.throws(new Error('i am an error'));
      const result = await income.save();
      expect(result).to.eql('an error has occurred');
    });
    it('should handle correct saves appropriately', async () => {
      const resolvedResult = { id: 'iamanid', title: 'wages', amount: 2300, frequency: 'Monthly', nextDueDate: '01-02-2018' };
      addStub.resolves(resolvedResult);
      const result = await income.save();
      expect(result).to.eql(resolvedResult);
    });
  });*/
});
