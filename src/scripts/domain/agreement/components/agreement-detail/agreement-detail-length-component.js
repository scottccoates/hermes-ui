import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  const agreementDetailItem = React.createClass({
    displayName: "AgreementDetailLengthComponent",

    render() {
      return (
        <div className="agreement-detail-length-info">

          <div className="data-container">

            <div className="data-row">
              <div className="name">Execution Date</div>
              <div className="value">{this.props.agreement.executionDate}</div>
            </div>

            <div className="data-row">
              <div className="name">Initial Term Length</div>
              <div className="value">{this.props.agreement.termLength}</div>
            </div>
          </div>

        </div>
      );
    }
  });

  return new DependencyProvider(agreementDetailItem);
};
