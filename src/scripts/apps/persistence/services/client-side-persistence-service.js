/*
This module is for storing things on the client, like the session token, cookies, etc.
 */
import store from 'store';

const namespace = 'hermes';

export default {
  save(path, data){

    const key = `${namespace}:${path}`;

    const retVal = store.set(key, data);

    return retVal;
  },

  delete(path){

    const key = `${namespace}:${path}`;

    const retVal = store.remove(key);

    return retVal;
  },

  get(path){

    const key = `${namespace}:${path}`;

    const retVal = store.get(key);

    return retVal;
  }
};
