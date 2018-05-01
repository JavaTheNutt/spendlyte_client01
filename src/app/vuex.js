import { preferences, auth, autocomplete } from './data/store';

export const modules = { auth: auth.store, preferences: preferences.store, autocomplete: autocomplete.store };

export const types = { auth: auth.types, preferences: preferences.types, autocomplete: autocomplete.types };
