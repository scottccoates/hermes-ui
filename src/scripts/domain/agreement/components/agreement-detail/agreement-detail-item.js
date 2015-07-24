import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';


export default function () {

  const agreementDetailItem = React.createClass({
    displayName: "AgreementDetailItem",

    statics: {
      async routerWillRun(state, flux) {
        let { agreementId } = state.params;
        let agreementActions = flux.getActions('agreementActions');

        return await agreementActions.getAgreementDetails(agreementId);
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
