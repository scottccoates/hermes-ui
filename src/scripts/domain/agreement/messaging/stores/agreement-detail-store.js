import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import log from 'loglevel';

export default function () {
  class AgreementDetailStore extends Store {

    constructor(flux) {
      super();

      const agreementActions = flux.getActionIds('AgreementActions');
      this.register(agreementActions.requestAgreementDetail, this.onRequestAgreementDetail);
      this.register(agreementActions.agreementDetailReceived, this.onAgreementDetailReceived);

      this.state = {
        agreement: {
          id: null
        },
        requestedAgreementDetail: {id: null}
      };
    }

    onRequestAgreementDetail(agreementId) {
      log.info("AgreementDetailStore: Agreement detail requested: %s", agreementId);

      this.setState({requestedAgreementDetail: {id: agreementId}});
    }

    onAgreementDetailReceived(agreement) {
      log.info("AgreementDetailStore: Agreement detail received: %s", agreement.id);

      this.setState({agreement: agreement});
    }
  }

  return new DependencyProvider(AgreementDetailStore);
}
