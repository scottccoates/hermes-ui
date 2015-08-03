/*
This module is for storing things on the client, like the session token, cookies, etc.
 */
import {BankersBox} from 'bankers-box';

const namespace = 'hermes';
const bb        = new BankersBox(0);

export default {
  save(path, data){

    const key = `${namespace}:${path}`;

    const retVal = bb.set(key, data);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  },

  delete(path){

    const key = `${namespace}:${path}`;

    const retVal = bb.del(key);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  },

  get(path){

    const key = `${namespace}:${path}`;

    const retVal = bb.get(key);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  }
}
