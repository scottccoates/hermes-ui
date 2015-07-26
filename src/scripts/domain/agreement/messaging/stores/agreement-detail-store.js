import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class AgreementDetailStore extends Store {

    constructor(flux) {
      super();

      const agreementActions = flux.getActionIds('AgreementActions');
      this.register(agreementActions.requestAgreementDetail, this.onRequestAgreementDetail);

      this.state = {
        agreementId: null
      };
    }

    onRequestAgreementDetail(agreementId) {
      this.setState({agreementId: agreementId});
    }
  }

  return new DependencyProvider(AgreementDetailStore);
}
