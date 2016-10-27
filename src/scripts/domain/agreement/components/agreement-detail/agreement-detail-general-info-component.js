import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {


  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementDetailGeneralInfoComponent';
    }

    render() {
      return (
        <div className="agreement-detail-general-info">

          <div className="data-container">
            <div className="data-row">
              <div className="name">Agreement Name</div>
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
              <div className="name">Agreement Type</div>
              <div className="value">{this.props.agreement.typeName}</div>
            </div>
          </div>

        </div>
      );
    }
  }

  return new DependencyProvider(Component);
};
