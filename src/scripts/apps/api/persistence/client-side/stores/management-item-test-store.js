import { Store } from 'flummox';

import Immutable from 'immutable';

export default class ManagementItemStore extends Store {

  constructor(flux) {
    super();

    const clientSideActions = flux.getActionIds('clientSide');
    this.register(clientSideActions.managementItemSavedToClient, this.onSave);
  }

  onSave(managementItem) {
    console.log('pretend I am doing some other data modifications', managementItem);
  }
};
