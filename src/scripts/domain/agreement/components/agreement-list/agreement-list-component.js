'use strict';

import React from 'react';
import router  from 'react-router';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import ButtonSelect from 'src/scripts/libs/react-js/components/button-select'

import agreementValueLabel from 'src/scripts/apps/formatting/agreement/agreement-value-label';

const {Link} = router;

const {sortTypes} = agreementValueLabel;

export default function (agreementListItemComponent) {

  const AgreementListItem = agreementListItemComponent.dependency;

  const component = React.createClass({
    displayName: "AgreementListComponent",

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
  });

  return new DependencyProvider(component);
};
