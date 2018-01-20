// @flow
import localForage from 'localforage';

class PreferenceDataStore {
  _preferenceDataStore: localForage;
  constructor () {
    this._preferenceDataStore = localForage.createInstance({
      name: 'preferenceDataStore'
    });
  }

  get preferenceDataStore (): localForage {
    return this._preferenceDataStore;
  }

  async trustDevice () {
    console.log('trusting device');
    await this.setPreference('trusted_device', true);
    await this.removePreference('ask_trusted');
  }

  async shouldAskTrusted ():Promise<boolean> {
    if (await this.isTrustedDevice()) return false;
    return await this.getPreference('ask_trusted') !== false;
  }
  async fetchTrustStatus ():Promise<{trustedDevice:boolean, askTrusted:boolean}> {
    const trustedDevice: boolean = await this.isTrustedDevice();
    const askTrusted: boolean = await this.shouldAskTrusted();
    return {
      trustedDevice,
      askTrusted
    };
  }
  async untrustDevice ():Promise<{trustedDevice:boolean, askTrusted:boolean}> {
    console.log('untrusting device');
    const isTrusted: boolean = await this.isTrustedDevice();
    console.debug('device previously trusted?', isTrusted);
    isTrusted ? await this.removePreference('ask_trusted') : await this.setPreference('ask_trusted', true);
    await this.removePreference('trusted_device');
    return { trustedDevice: false, askTrusted: !isTrusted };
  }
  async disableTrustReminder ():Promise<{trustedDevice:boolean, askTrusted:boolean}> {
    console.debug('disabling trust reminders');
    await this.removePreference('trusted_device');
    await this.setPreference('ask_trusted', false);
    console.debug('returning from disable trust reminder function with', { trustedDevice: false, askTrusted: false });
    return { trustedDevice: false, askTrusted: false };
  }
  async isTrustedDevice ():Promise<boolean> {
    return await this.getPreference('trusted_device') || false;
  }

  async setPreference (key: string, value: string|boolean) {
    console.log('setting preference', key, 'to', value);
    await set(this._preferenceDataStore, key, value);
  }

  async removePreference (key:string) {
    console.log('removing preference', key);
    await reset(this._preferenceDataStore, key);
  }

  async getPreference (key:string) {
    console.log('fetching preference', key);
    return await get(this._preferenceDataStore, key);
  }
}

export const preferenceDataStore = new PreferenceDataStore();

const set = async (store, key, value) => {
  await store.setItem(key, value);
};
const reset = async (store, key) => {
  await store.removeItem(key);
};
const get = async (store, key) => await store.getItem(key);
