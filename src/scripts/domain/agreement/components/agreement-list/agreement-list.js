'use strict';

import React from 'react';
import Router  from 'react-router';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;

export default function (agreementItemComponent) {

  const AgreementItem = agreementItemComponent.dependency;

  const component = React.createClass({
    displayName: "AgreementList",
    mixins: [ImmutableRenderMixin],

    render() {
      const agreementNodes = this.props.agreements.map(function (agreement) {
        return (
          <div className="content-section-item space-top-sm" key={agreement.id}>
            <AgreementItem agreementName={agreement['agreementName']}/>
          </div>
        );
      });

      return (
        <div id="agreement-list-wrapper">
          <section className="row">
            <div className="col-sm-24">
              <h3 className="content-section-header">Agreements</h3>
              {agreementNodes}
            </div>
          </section>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
