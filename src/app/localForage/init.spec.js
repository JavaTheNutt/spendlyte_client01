import {clientDataStore} from './init';

describe('ClientDatastore.js', () => {
  describe('isTrustedDevice', () => {
    beforeEach(async () => {
      await clientDataStore.preferenceDataStore.clear();
    });
    it('should return true when the device is trusted', async () => {
      await clientDataStore.trustDevice();
      expect(await clientDataStore.isTrustedDevice()).to.be.true;
    });
    it('should return false when the device_trusted key does not exist', async () => {
      expect(await clientDataStore.isTrustedDevice()).to.be.false;
    });
  });

  describe('shouldAskTrusted', () => {
    describe('state', () => {
      it('should return false when the trusted flag is true, even when the ask flag is true', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', true);
        console.log(await clientDataStore.preferenceDataStore.getItem('trusted_device'));
        await clientDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await clientDataStore.shouldAskTrusted()).to.be.false;
      });
      it('should return true when the trusted flag is false and the ask flag is true', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', false);
        await clientDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await clientDataStore.shouldAskTrusted()).to.be.true;
      });
      it('should return false when both are false', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', false);
        await clientDataStore.preferenceDataStore.setItem('ask_trusted', false);
        expect(await clientDataStore.shouldAskTrusted()).to.be.false;
      });
      it('should return true when trusted is false and ask is null', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', false);
        await clientDataStore.preferenceDataStore.removeItem('ask_trusted');
        expect(await clientDataStore.shouldAskTrusted()).to.be.true;
      });
      it('should return true when both are null', async () => {
        await clientDataStore.preferenceDataStore.removeItem('trusted_device');
        await clientDataStore.preferenceDataStore.removeItem('ask_trusted');
        expect(await clientDataStore.shouldAskTrusted()).to.be.true;
      });
    });
  });
});
