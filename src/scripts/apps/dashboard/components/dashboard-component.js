'use strict';

import React from 'react';
import Router  from 'react-router';

import ConnectToStores from 'flummox/connect';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;

export default function (agreementListComponent) {
  const AgreementList = agreementListComponent.dependency;

  const component          = React.createClass({

    displayName: "DashboardComponent",

    render() {
      return (
        <div id="dashboard-wrapper">

          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Dashboard</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <h3 className="content-section-header">Your Contracts</h3>
              <AgreementList agreements={this.props.agreements}/>
            </div>
          </div>

        </div>
      );
    }
  });
  const dashboardComponent = ConnectToStores(component, 'AgreementListStore');

  // probably best way to make this func available to router: https://github.com/acdlite/flummox/issues/173
  dashboardComponent.asyncTransition = (flux, state) => {
    console.log("doing async transition. state: ", state);

    const sessionStore = flux.getStore('SessionStore');

    const userId = sessionStore.state.user.userId;

    const agreementActions = flux.getActions('AgreementActions');

    const agreementListStore = flux.getStore('AgreementListStore');

    agreementActions.requestAgreementList(userId);

    return new Promise((res, rej) => {
      agreementListStore.once('change', _=> {
        console.log("agreementListStore", agreementListStore);
        res();
      });
    });
  };

  return new DependencyProvider(dashboardComponent);
};
