'use strict';

import React from 'react';
import {Link} from 'react-router';

import { connect } from 'react-redux';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementListComponent) {
  const AgreementList = agreementListComponent.dependency;

  var component = React.createClass({

    displayName: "DashboardComponent",

    render() {

      var agreementListContent = null;

      if (this.props.agreements.length) {

        agreementListContent = (
          <div>
            <h3 className="content-section-header">Your Agreements</h3>
            <AgreementList agreements={this.props.agreements}/>
          </div>
        );
      }
      else {
        agreementListContent = (
          <div>
            <h3 className="content-section-header ">
              Sorry, there are no agreements in the system.
              <br />
              Please <Link to="/agreements/step-1" className='underline'>upload one</Link> to get started.
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

  component = connect(x=> x.userAgreements)(component);
  return new DependencyProvider(component);
};
