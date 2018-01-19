import localForage from 'localforage';
;

class ClientDataStore {
  constructor () {
    this._preferenceDataStore = localForage.createInstance({
      name: 'preferenceDataStore'
    });
  }

  get preferenceDataStore () {
    return this._preferenceDataStore;
  }

  async trustDevice () {
    console.log('trusting device');
    await this.setPreference('trusted_device', true);
    await this.removePreference('ask_trusted');
  }

  async shouldAskTrusted () {
    if (await this.isTrustedDevice()) return false;

    return await this.getPreference('ask_trusted') !== false;
  }
  async fetchTrustStatus () {
    return {
      trustedDevice: await this.isTrustedDevice(),
      askTrusted: await this.shouldAskTrusted()
    };
  }
  async untrustDevice () {
    const trustedState = {};
    const isTrusted = await this.isTrustedDevice();
    trustedState.askTrusted = isTrusted ? false : ((await this.getPreference('ask_trusted') || false));
    trustedState.trustedDevice = false;
    if (isTrusted) {
      await this.removePreference('ask_trusted');
    }
    await this.removePreference('trusted_device');
    return trustedState;
  }
  async isTrustedDevice () {
    return await this.getPreference('trusted_device') || false;
  }

  async setPreference (key, value) {
    console.log('setting preference', key, 'to', value);
    await set(this._preferenceDataStore, key, value);
  }

  async removePreference (key) {
    console.log('removing preference', key);
    await reset(this._preferenceDataStore, key);
  }

  async getPreference (key) {
    console.log('fetching preference', key);
    return await get(this._preferenceDataStore, key);
  }
}

export const clientDataStore = new ClientDataStore();

const set = async (store, key, value) => {
  await store.setItem(key, value);
};
const reset = async (store, key) => {
  await store.removeItem(key);
};
const get = async (store, key) => await store.getItem(key);
