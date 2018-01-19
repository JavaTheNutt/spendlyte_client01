/*global describe*/
/*global it*/
/*global sinon*/
import types from './types';
import actions from './actions';
import { preferenceDataStore } from '@/app/data/localForage/PreferenceDataStore';

const sandbox = sinon.sandbox.create();
describe('preferences actions', () => {
  let commitStub;
  beforeEach(() => {
    commitStub = sandbox.stub();
  });
  afterEach(() => sandbox.restore());
  describe('testTrustedDevice', () => {
    describe('is trusted', () => {
      before(async () => {
        await preferenceDataStore.setPreference('trusted_device', true);
        await preferenceDataStore.removePreference('ask_trusted');
      });
      it('should commit true when the device is trusted', async () => {
        await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
        expect(commitStub).to.be.calledTwice;
        expect(commitStub).to.be.calledWith(types.mutations.SET_TRUSTED_DEVICE, true);
        expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, false);
      });
    });
    describe('not trusted', () => {
      before(async () => {
        await preferenceDataStore.removePreference('trusted_device');
      });
      it('should commit false when the device is untrusted', async () => {
        await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
        expect(commitStub).to.be.calledTwice;
        expect(commitStub).to.be.calledWith(types.mutations.SET_TRUSTED_DEVICE, false);
      });
      describe('ask trusted', () => {
        before(async () => {
          await preferenceDataStore.removePreference('ask_trusted');
        });
        it('should commit true when an askTrusted key does not exist', async () => {
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, true);
        });
        it('should commit true when the key explicitly says so', async () => {
          await preferenceDataStore.setPreference('ask_trusted', true);
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, true);
        });
        it('should commit false when the key explicitly says not to ask', async () => {
          await preferenceDataStore.setPreference('ask_trusted', false);
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, false);
        });
      });
    });
  });
  describe('trustDevice', () => {
    let trustDeviceStub;
    beforeEach(() => {
      trustDeviceStub = sandbox.stub(preferenceDataStore, 'trustDevice');
    });
    it('should tell the datastore to trust the device', async () => {
      await actions[types.actions.trustDevice]({ commit: commitStub });
      expect(trustDeviceStub).to.be.calledOnce;
    });
    it('should tell the store to trust the device', async () => {
      await actions[types.actions.trustDevice]({ commit: commitStub });
      expect(commitStub).to.be.calledOnce;
      expect(commitStub).to.be.calledWith(types.mutations.TRUST_DEVICE);
    });
  });
  describe('untrustDevice', () => {
    let doNotTrustDeviceStub;
    beforeEach(() => {
      doNotTrustDeviceStub = sandbox.stub(preferenceDataStore, 'untrustDevice');
    });
    it('should tell the persistent store not to trust the device', async () => {
      await actions[types.actions.untrustDevice]({ commit: commitStub });
      expect(doNotTrustDeviceStub).to.be.calledOnce;
    });
    it('should tell the vuex store not to trust the device', async () => {
      const response = { trustDevice: false, askTrusted: true };
      doNotTrustDeviceStub.resolves(response);
      await actions[types.actions.untrustDevice]({ commit: commitStub });
      expect(commitStub).to.be.calledOnce;
      expect(commitStub).to.be.calledWith(types.mutations.UPDATE_TRUST_STATUS, response);
    });
  });
  describe('doNotAskToTrustDevice', () => {
    it('should tell the persistent store not to ask to trust the device');
    it('should tell the persistent store not to trust the device');
    it('should tell the persistent store not to ask to trust the device');
    it('should tell the persistent store not to trust the device');
  });
});

