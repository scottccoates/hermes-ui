import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class AgreementStore extends Store {

    constructor(flux) {
      super();

      const agreementActions = flux.getActionIds('agreementActions');
      this.register(agreementActions.addToCollection, this.onSave);
      this.register(agreementActions.uploadContractBegan, this.onUploadContractBegan);
      this.register(agreementActions.uploadContractProgressed, this.onUploadContractProgressed);
      this.register(agreementActions.uploadContractCompleted, this.onUploadContractCompleted);
      this.register(agreementActions.agreementsReceived, this.onAgreementsReceived);

      this.state = {
        agreements: Immutable.List()
      };
    }

    onSave(agreement) {
      this.setState({
        agreements: this.state.agreements.concat([agreement])
      });
    }


    onUploadContractBegan() {

    }

    onUploadContractProgressed() {

    }

    onUploadContractCompleted() {

    }

    onAgreementsReceived(data) {
      this.setState({agreements: data});
    }
  }

  return new DependencyProvider(AgreementStore);
}
