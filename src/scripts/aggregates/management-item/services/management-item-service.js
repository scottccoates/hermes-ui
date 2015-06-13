import ManagementItemFactory from 'src/scripts/aggregates/management-item/services/management-item-factory';

import ManagementItemActions from 'src/scripts/aggregates/management-item/actions/actions';

export default {

  create({name}){
    debugger
    const mi = ManagementItemFactory.create(name);
    this.save(mi);
  },

  save(mi){
    ManagementItemActions.save(mi);
  }

};
