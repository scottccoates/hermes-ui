import ManagementItemFactory from './management-item-factory';

import ManagementItemActions from '../messaging/management-item-actions';

export default function (miRepository) {

  return {
    async create({name}){
      const mi = ManagementItemFactory.create(name);
      return this.save(mi);
    },

    async save(mi){
      return miRepository.save(mi);
    }
  };

};
