import {BankersBox} from 'bankers-box';

const namespace = 'hermes';
const bb        = new BankersBox(0);

export default {
  async save(path, data){

    const key = `${namespace}:${path}`;

    const retVal = bb.set(key, data);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  },

  async delete(path){

    const key = `${namespace}:${path}`;

    const retVal = bb.del(key);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  },

  async get(path){

    const key = `${namespace}:${path}`;

    const retVal = bb.get(key);

    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  }
}
