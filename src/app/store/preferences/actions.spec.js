import types from './types';
import actions from './actions';
import { clientDataStore } from '@/app/localForage/init';

const sandbox = sinon.sandbox.create();
describe('preferences actions', () => {
  afterEach(() => sandbox.restore());
  describe('testTrustedDevice', () => {
    let commitStub;
    beforeEach(() => {
      commitStub = sandbox.stub();
    });
    describe('is trusted', () => {
      before(async () => {
        await clientDataStore.setPreference('trusted_device', true);
        await clientDataStore.removePreference('ask_trusted');
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
        await clientDataStore.removePreference('trusted_device');
      });
      it('should commit false when the device is untrusted', async () => {
        await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
        expect(commitStub).to.be.calledTwice;
        expect(commitStub).to.be.calledWith(types.mutations.SET_TRUSTED_DEVICE, false);
      });
      describe('ask trusted', () => {
        before(async () => {
          await clientDataStore.removePreference('ask_trusted');
        });
        it('should commit true when an askTrusted key does not exist', async () => {
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, true);
        });
        it('should commit true when the key explicitly says so', async () => {
          await clientDataStore.setPreference('ask_trusted', true);
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, true);
        });
        it('should commit false when the key explicitly says not to ask', async () => {
          await clientDataStore.setPreference('ask_trusted', false);
          await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
          expect(commitStub).to.be.calledTwice;
          expect(commitStub).to.be.calledWith(types.mutations.SET_ASK_TRUSTED, false);
        });
      });
    });
  });
});

