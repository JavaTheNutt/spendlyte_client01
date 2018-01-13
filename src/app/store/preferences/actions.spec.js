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
      });
      it('should commit true when the device is trusted', async () => {
        await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
        expect(commitStub).to.be.calledOnce;
        expect(commitStub).to.be.calledWith(types.mutations.SET_TRUSTED_DEVICE, true);
      });
    });
    describe('not trusted', () => {
      before(async () => {
        await clientDataStore.removePreference('trusted_device');
      });
      it('should commit false when the device is untrusted', async () => {
        await actions[ types.actions.testTrustedDevice ]({ commit: commitStub });
        expect(commitStub).to.be.calledOnce;
        expect(commitStub).to.be.calledWith(types.mutations.SET_TRUSTED_DEVICE, false);
      });
    });
  });
});

