import localForage from 'localforage';
import * as Logger from 'loglevel';

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
    Logger.info('trusting device');
    await this.setPreference('trust_device', true);
    await this.removePreference('ask_trusted');
  }
  async setPreference (key, value) {
    Logger.info('setting preference', key, 'to', value);
    await set(this._preferenceDataStore, key, value);
  }

  async removePreference (key) {
    Logger.info('removing preference', key);
    await reset(this._preferenceDataStore, key);
  }

  async getPreference (key) {
    Logger.info('fetching preference', key);
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
