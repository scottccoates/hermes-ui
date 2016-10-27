'use strict';

import React from 'react';
import {Link} from 'react-router';

import { connect } from 'react-redux';


import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementListComponent) {
  const AgreementList = agreementListComponent.dependency;

  let component = React.createClass({

    displayName: "AgreementListContainerComponent",

    render() {

      let agreementListContent = null;

      if (this.props.userAgreements.agreements.length) {

        agreementListContent = (
          <AgreementList agreements={this.props.userAgreements.agreements}/>
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
        <div id="agreement-list-container-wrapper">

          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Your Agreements</h1>
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

  function extracted(state) {
    return {
      userAgreements: state.userAgreements
    };
  }

  component = connect(extracted)(component);
  return new DependencyProvider(component);
}
