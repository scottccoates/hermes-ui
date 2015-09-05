'use strict';

import React from 'react';
import {Link} from 'react-router';

import Immutable from 'immutable';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementListComponent) {
  const AgreementList = agreementListComponent.dependency;

  const component = React.createClass({

    displayName: "DashboardComponent",

    getDefaultProps() {
      return {"agreements": Immutable.List()}
    },

    render() {

      var agreementListContent = null;

      if (this.props.agreements.size) {

        agreementListContent = (
          <div>
            <h3 className="content-section-header">Your Contracts</h3>
            <AgreementList agreements={this.props.agreements}/>
          </div>
        );
      }
      else {
        agreementListContent = (
          <div>
            <h3 className="content-section-header regular-text">
              Sorry, there are no contracts in the system.
              <br />
              Please <Link to="createAgreement" className='underline'>upload one</Link> to get started.
            </h3>
          </div>
        );
      }

      return (
        <div id="dashboard-wrapper">

          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Dashboard</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              {agreementListContent}
            </div>
          </div>

        </div>
      );
    }
  });
  //const dashboardComponent = ConnectToStores(component, 'AgreementListStore');
  //
  //// probably best way to make this func available to router: https://github.com/acdlite/flummox/issues/173
  //dashboardComponent.asyncTransition = (flux, state) => {
  //  const sessionStore = flux.getStore('SessionStore');
  //
  //  const userId = sessionStore.state.user.userId;
  //
  //  const agreementActions = flux.getActions('AgreementActions');
  //
  //  agreementActions.requestAgreementList(userId);
  //};

  return new DependencyProvider(component);
};
