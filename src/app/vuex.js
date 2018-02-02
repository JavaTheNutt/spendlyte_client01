import { preferences, auth } from './data/store';

export const modules = { auth: auth.store, preferences: preferences.store };

export const types = { auth: auth.types, preferences: preferences.types };
