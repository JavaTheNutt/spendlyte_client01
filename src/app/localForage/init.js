import localForage from 'localForage';
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
  async setPreference (key, value) {
    Logger.info('setting preference', key, 'to', value);
    await this._preferenceDataStore.setItem(key, value);
  }
  async removePreference (key) {
    Logger.info('removing preference', key);
    await this._preferenceDataStore.removeItem(key);
  }
}

export const clientDataStore = new ClientDataStore();
