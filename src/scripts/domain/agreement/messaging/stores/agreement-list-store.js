import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class AgreementListStore extends Store {

    constructor(flux) {
      super();

      const agreementActions = flux.getActionIds('AgreementActions');
      this.register(agreementActions.addToCollection, this.onSave);
      this.register(agreementActions.uploadContractBegan, this.onUploadContractBegan);
      this.register(agreementActions.uploadContractProgressed, this.onUploadContractProgressed);
      this.register(agreementActions.uploadContractCompleted, this.onUploadContractCompleted);
      this.register(agreementActions.requestAgreementList, this.onAgreementListRequested);
      this.register(agreementActions.agreementListReceived, this.onAgreementListReceived);

      this.state = {
        agreements: Immutable.List(),
        requestedAgreementList: {userId: null}
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

    onAgreementListRequested(userId) {
      this.setState({
        requestedAgreementList: {
          userId: userId
        }
      });
    }

    onAgreementListReceived(data) {
      this.setState({agreements: data});
    }
  }

  return new DependencyProvider(AgreementListStore);
}
