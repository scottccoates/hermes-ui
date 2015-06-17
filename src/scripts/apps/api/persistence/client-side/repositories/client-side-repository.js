import {BankersBox} from 'bankers-box';

const namespace = 'hermes-tmp';
const bb        = new BankersBox(0);

export default {
  _getNextId(path){
    const nextId = bb.incr(`${namespace}:${path}:next-id`);

    return nextId;
  },

  async save(path, data){

    const collectionKey = `${namespace}:${path}`;
    const nextId        = this._getNextId();
    const collection    = bb.get(path) || {};
    collection[nextId]  = data;

    const retVal = bb.set(collectionKey, collection);
    // These methods are async, so no need to return a promise explicitly.
    // Ex: return Promise.resolve(retVal);
    return retVal;
  }
}
