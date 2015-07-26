import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  const agreementDetailItem = React.createClass({
    displayName: "AgreementDetailGeneralInfoComponent",

    render() {
      return (
        <div className="agreement-detail-general-info">

          <div className="data-container">
            <div className="data-row">
              <div className="name">Contract Name</div>
              <div className="value">{this.props.agreement.name}</div>
            </div>
            <div className="data-row">
              <div className="name">Counterparty</div>
              <div className="value">{this.props.agreement.counterparty}</div>
            </div>
            <div className="data-row">
              <div className="name">Brief Description</div>
              <div className="value">{this.props.agreement.description}</div>
            </div>
            <div className="data-row">
              <div className="name">Contract Type</div>
              <div className="value">{this.props.agreement.type}</div>
            </div>
          </div>

        </div>
      );
    }
  });

  return new DependencyProvider(agreementDetailItem);
};
