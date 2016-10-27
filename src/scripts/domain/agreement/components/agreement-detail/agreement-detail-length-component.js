import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementDetailLengthComponent';
    }

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
  }

  return new DependencyProvider(Component);
};
