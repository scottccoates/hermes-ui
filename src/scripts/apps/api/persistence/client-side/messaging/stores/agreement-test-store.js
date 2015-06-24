import { Store } from 'flummox';

import Immutable from 'immutable';

export default class AgreementStore extends Store {

  constructor(flux) {
    super();

    const clientSideActions = flux.getActionIds('clientSide');
    this.register(clientSideActions.agreementSavedToClient, this.onSave);
  }

  onSave(agreement) {
    console.log('pretend I am doing some other data modifications', agreement);
  }
};
