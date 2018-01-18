import { clientDataStore } from './init';

describe('ClientDatastore.js', () => {
  describe('isTrustedDevice', () => {
    beforeEach(async () => {
      await clientDataStore.preferenceDataStore.clear();
    });
    it('should return true when the device is trusted', async () => {
      clientDataStore.trustDevice();
      expect(await clientDataStore.isTrustedDevice()).to.be.true;
    });
    it('should return false when the device_trusted key does not exist', async () => {
      console.log(await clientDataStore.preferenceDataStore.getItem('trusted_device'));
      expect(await clientDataStore.isTrustedDevice()).to.be.false;
    });
  });
});
