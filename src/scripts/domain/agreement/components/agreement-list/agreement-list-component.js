'use strict';

import React from 'react';
import {Link}  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import ButtonSelect from '../../../../libs/react-js/components/button-select'

import agreementValueLabel from '../../../../apps/formatting/agreement/agreement-value-label';

const {sortTypes} = agreementValueLabel;

export default function (agreementListItemComponent) {

  const AgreementListItem = agreementListItemComponent.dependency;

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementListComponent';
    }

    render() {
      const agreementNodes = this.props.agreements.map(function (agreement) {
        return (
          <div className="content-section-item space-top-sm" key={agreement.id}>
            <AgreementListItem agreement={agreement}/>
          </div>
        );
      });

      return (
        <div className="agreement-list-wrapper">

          <div className="agreement-list-items">
            {agreementNodes}
          </div>

        </div>
      );
    }
  }

  return new DependencyProvider(Component);
};
