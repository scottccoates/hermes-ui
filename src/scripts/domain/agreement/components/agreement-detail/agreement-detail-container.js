import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';


export default function () {

  const agreementDetailItem = React.createClass({
    displayName: "AgreementDetailContainer",

    statics: {
      asyncTransition(flux, params) {
        const { agreementId } = state.params;
        const agreementActions = flux.getActions('AgreementActions');

        return agreementActions.requestAgreementDetails(agreementId);
      }
    },

    render() {
      return (
        <div />
      );
    }
  });

  return new DependencyProvider(agreementDetailItem);
};
