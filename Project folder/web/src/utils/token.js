import atob from 'atob';
import _ from 'lodash';

export const STORAGE_TOKEN_NAME = 'lt';
export const STORAGE_UID_TOKEN_NAME = 'ltuid';
export const STORAGE_ISLOGGEDOUT_TOKEN_NAME = 'lts';

export default {
  parse() {
    let token = this.get();
    const arr = token.split('.');
    if (arr.length === 3) {
      token = atob(token.split('.')[1]);
    }
    return JSON.parse(token);
  },

  check() {
    try {
      const payload = this.parse();
      return !_.isEmpty(payload);
    } catch (ex) {
      this.remove();
      return false;
    }
  },

  get() {
    return localStorage.getItem(STORAGE_TOKEN_NAME);
  },

  getUid() {
    return localStorage.getItem(STORAGE_UID_TOKEN_NAME);
  },

  async save(payload) {
    return await Promise.resolve().then(() => {
      window.localStorage.setItem(STORAGE_TOKEN_NAME, payload.accessToken);
      window.localStorage.setItem(STORAGE_UID_TOKEN_NAME, payload.uid);
      this.unsetIsLoggedOut();
      return true;
    });
  },

  remove() {
    window.localStorage.removeItem(STORAGE_TOKEN_NAME);
  },

  removeAll() {
    window.localStorage.removeItem(STORAGE_TOKEN_NAME);
    window.localStorage.removeItem(STORAGE_UID_TOKEN_NAME);
  },

  getIsLoggedOut() {
    return window.localStorage.getItem(STORAGE_ISLOGGEDOUT_TOKEN_NAME);
  },

  setIsLoggedOut() {
    window.localStorage.setItem(STORAGE_ISLOGGEDOUT_TOKEN_NAME, 1);
  },

  unsetIsLoggedOut() {
    window.localStorage.removeItem(STORAGE_ISLOGGEDOUT_TOKEN_NAME);
  },
};
