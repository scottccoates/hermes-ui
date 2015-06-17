import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from '/src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class ManagementItemStore extends Store {

    constructor(flux) {
      super();

      const managementItemActions = flux.getActionIds('managementItemActions');
      this.register(managementItemActions.save, this.onSave);
      this.register(managementItemActions.uploadContractBegan, this.onUploadContractBegan);
      this.register(managementItemActions.uploadContractProgressed, this.onUploadContractProgressed);
      this.register(managementItemActions.uploadContractCompleted, this.onUploadContractCompleted);

      this.state = {
        managementItems: Immutable.List()
      };
    }

    onSave(managementItem) {
      this.setState({
        managementItems: this.state.managementItems.concat([managementItem])
      });
    }


    onUploadContractBegan() {

    }

    onUploadContractProgressed() {

    }

    onUploadContractCompleted() {

    }
  }

  return new DependencyProvider(ManagementItemStore);
}
