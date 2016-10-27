import React from 'react';
import {Link} from 'react-router';

import { connect } from 'react-redux';

import Separator from '../../../libs/react-js/components/separator';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementListComponent, alertListComponent) {
  const AgreementList = agreementListComponent.dependency;
  const AlertList     = alertListComponent.dependency;

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'DashboardComponent';
    }

    render() {

      const alerts = this.props.userAlerts.alerts;

      let alertListContent = null;

      if (alerts.length) {
        alertListContent = (
          <div>
            <h3 className="content-section-header">Your Alerts</h3>
            <AlertList alerts={alerts}/>
            <Separator/>
          </div>
        );
      }
      else {
        alertListContent = (
          <div>
            <h3 className="content-section-header ">
              You have no alerts.
            </h3>
          </div>
        );
      }

      let agreementListContent = null;

      if (this.props.userAgreements.agreements.length) {

        agreementListContent = (
          <div>
            <h3 className="content-section-header">Your Agreements</h3>
            <AgreementList agreements={this.props.userAgreements.agreements}/>
          </div>
        );
      }
      else {
        agreementListContent = (
          <div>
            <h3 className="content-section-header ">
              Sorry, there are no agreements in the system.
              <br />
              Please <Link to="/agreements/step-1" className="underline">upload one</Link> to get started.
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
              {alertListContent}
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
  }

  function extracted(state) {
    return {
      userAgreements: state.userAgreements,
      userAlerts: state.userAlerts
    };
  }

  return new DependencyProvider(connect(extracted)(Component));
}
