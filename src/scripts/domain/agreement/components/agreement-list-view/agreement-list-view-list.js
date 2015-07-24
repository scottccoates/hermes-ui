'use strict';

import React from 'react';
import router  from 'react-router';

import immutableRenderMixin from 'react-immutable-render-mixin';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

const {Link} = router;

export default function (agreementListViewItemComponent) {

  const AgreementListViewItem = agreementListViewItemComponent.dependency;

  const component = React.createClass({
    displayName: "agreementListViewList",

    mixins: [
      immutableRenderMixin
    ],

    render() {
      const agreementNodes = this.props.agreements.map(function (agreement) {
        return (
          <div className="content-section-item space-top-sm" key={agreement.id}>
            <AgreementListViewItem agreement={agreement}/>
          </div>
        );
      });

      return (
        <div id="agreement-list-view-list-wrapper">

          <div className="content-section-item space-bottom">
            <button className="btn btn-info btn-sm" type="button">
              <span className='middle'>Sort By: Date Created</span>
              <i className="fa fa-chevron-down space-left middle"></i>
            </button>
          </div>

          <div className="agreement-list-view-items">
            {agreementNodes}
          </div>

        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
