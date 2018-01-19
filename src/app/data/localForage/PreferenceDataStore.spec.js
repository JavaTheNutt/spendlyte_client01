/*global describe*/
/*global it*/
/*global sinon*/

import { preferenceDataStore } from './PreferenceDataStore';

describe('preferenceDataStore.js', () => {
  beforeEach(async () => {
    await preferenceDataStore.preferenceDataStore.clear();
  });
  describe('isTrustedDevice', () => {
    it('should return true when the device is trusted', async () => {
      await preferenceDataStore.trustDevice();
      expect(await preferenceDataStore.isTrustedDevice()).to.be.true;
    });
    it('should return false when the device_trusted key does not exist', async () => {
      expect(await preferenceDataStore.isTrustedDevice()).to.be.false;
    });
  });
  describe('untrustDevice', () => {
    describe('state', () => {
      it('should set "trusted_device" to null', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', true);
        expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is not trusted').to.be.true;
        await preferenceDataStore.untrustDevice();
        expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device')).to.not.exist;
      });
      it('should_set "ask_trusted" to null when "trusted_device" was true', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', true);
        await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is not trusted').to.be.true;
        expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted'), 'set up failed: device is not asking for trust').to.be.true;
        await preferenceDataStore.untrustDevice();
        expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted')).to.not.exist;
      });
      it('should not change "ask_trusted" when "trusted_device" was null', async () => {
        await preferenceDataStore.preferenceDataStore.removeItem('trusted_device');
        await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await preferenceDataStore.preferenceDataStore.getItem('trusted_device'), 'set up failed: device is trusted').to.not.exist;
        expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted'), 'set up failed: device is not asking for trust').to.be.true;
        await preferenceDataStore.untrustDevice();
        expect(await preferenceDataStore.preferenceDataStore.getItem('ask_trusted')).to.be.true;
      });
    });
    describe('values', () => {
      it('should return both as false when trusted was true', async () => {
        await (preferenceDataStore.preferenceDataStore.setItem('trusted_device', true));
        await (preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true));
        const res = await preferenceDataStore.untrustDevice();
        expect(res.trustedDevice).to.be.false;
        expect(res.askTrusted).to.be.false;
      });
      it('should return ask as true when ask was true and trusted was false', async () => {
        await (preferenceDataStore.preferenceDataStore.setItem('trusted_device', false));
        await (preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true));
        const res = await preferenceDataStore.untrustDevice();
        expect(res.trustedDevice).to.be.false;
        expect(res.askTrusted).to.be.true;
      });
      it('should return both as false when both were false', async () => {
        await (preferenceDataStore.preferenceDataStore.setItem('trusted_device', false));
        await (preferenceDataStore.preferenceDataStore.setItem('ask_trusted', false));
        const res = await preferenceDataStore.untrustDevice();
        expect(res.trustedDevice, 'trusted device is true').to.be.false;
        expect(res.askTrusted, 'ask trusted is true').to.be.false;
      });
    });
  });
  describe('shouldAskTrusted', () => {
    describe('state', () => {
      it('should return false when the trusted flag is true, even when the ask flag is true', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', true);
        await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await preferenceDataStore.shouldAskTrusted()).to.be.false;
      });
      it('should return true when the trusted flag is false and the ask flag is true', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', false);
        await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', true);
        expect(await preferenceDataStore.shouldAskTrusted()).to.be.true;
      });
      it('should return false when both are false', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', false);
        await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', false);
        expect(await preferenceDataStore.shouldAskTrusted()).to.be.false;
      });
      it('should return true when trusted is false and ask is null', async () => {
        await preferenceDataStore.preferenceDataStore.setItem('trusted_device', false);
        await preferenceDataStore.preferenceDataStore.removeItem('ask_trusted');
        expect(await preferenceDataStore.shouldAskTrusted()).to.be.true;
      });
      it('should return true when both are null', async () => {
        await preferenceDataStore.preferenceDataStore.removeItem('trusted_device');
        await preferenceDataStore.preferenceDataStore.removeItem('ask_trusted');
        expect(await preferenceDataStore.shouldAskTrusted()).to.be.true;
      });
    });
  });
  describe('fetchTrustStatus', () => {
    it('should return a trusted status when the data points to being trusted', async () => {
      await preferenceDataStore.preferenceDataStore.removeItem('ask_trusted');
      await preferenceDataStore.preferenceDataStore.setItem('trusted_device', true);
      const res = await preferenceDataStore.fetchTrustStatus();
      expect(res.trustedDevice).to.be.true;
      expect(res.askTrusted).to.be.false;
    });
    it('should return an untrusted status when the data points to being untrusted', async () => {
      await preferenceDataStore.preferenceDataStore.removeItem('ask_trusted');
      await preferenceDataStore.preferenceDataStore.setItem('trusted_device', false);
      const res = await preferenceDataStore.fetchTrustStatus();
      expect(res.trustedDevice).to.be.false;
      expect(res.askTrusted).to.be.true;
    });
    it('should return an untrusted status, but respect the ask_trusted flag, when the data points to being untrusted', async () => {
      await preferenceDataStore.preferenceDataStore.setItem('ask_trusted', false);
      await preferenceDataStore.preferenceDataStore.removeItem('trusted_device', false);
      const res = await preferenceDataStore.fetchTrustStatus();
      expect(res.trustedDevice).to.be.false;
      expect(res.askTrusted).to.be.false;
    });
  });
});
