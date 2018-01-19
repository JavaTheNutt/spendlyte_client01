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
  describe('untrustDevice', () => {
    describe('state', () => {
      it('should set "trusted_device" to null', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', true);
        expect(await clientDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is not trusted').to.be.true;
        await clientDataStore.untrustDevice();
        expect(await clientDataStore.preferenceDataStore.getItem('trusted_device')).to.not.exist;
      });
      it('should_set "ask_trusted" to null when "trusted_device" was true', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', true);
        await clientDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await clientDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is not trusted').to.be.true;
        expect(await clientDataStore.preferenceDataStore.getItem('ask_trusted'), 'set up failed: device is not asking for trust').to.be.true;
        await clientDataStore.untrustDevice();
        expect(await clientDataStore.preferenceDataStore.getItem('ask_trusted')).to.not.exist;
      });
      it('should not change "ask_trusted" when "trusted_device" was null', async () => {
        await clientDataStore.preferenceDataStore.removeItem('trusted_device');
        await clientDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await clientDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is trusted').to.not.exist;
        expect(await clientDataStore.preferenceDataStore.getItem('ask_trusted'), 'set up failed: device is not asking for trust').to.be.true;
        await clientDataStore.untrustDevice();
        expect(await clientDataStore.preferenceDataStore.getItem('ask_trusted')).to.be.true;
      });
    });
  });
  describe('shouldAskTrusted', () => {
    describe('state', () => {
      it('should return false when the trusted flag is true, even when the ask flag is true', async () => {
        await clientDataStore.preferenceDataStore.setItem('trusted_device', true);
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
