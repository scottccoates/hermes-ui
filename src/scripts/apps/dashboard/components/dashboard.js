'use strict';

import React from 'react';
import Router  from 'react-router';

import ConnectToStores from 'flummox/connect';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;

export default function (agreementListComponent) {
  const AgreementList = agreementListComponent.dependency;

  const component = React.createClass({

    displayName: "Dashboard",

    render() {
      return (
        <div id="dashboard-wrapper">

          <div className="content-section default-content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Dashboard</h1>
            </div>
          </div>


          <div className="content-section default-content-section space-bottom">
            <div className="container">
              <div className="content-section-item">
                <h3 className="content-section-header">Your Contracts</h3>
              </div>
              <AgreementList agreements={this.props.agreements}/>
            </div>
          </div>

          <div className="content-section alt-content-section space-top space-bottom activity-list-content-section">
            <div className="container">
            </div>
          </div>

        </div>
      );
    }
  });
  return new DependencyProvider(ConnectToStores(component, 'AgreementListViewStore'));
};
