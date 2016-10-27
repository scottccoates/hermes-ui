'use strict';

import React from 'react';
import {Link}  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementListItemComponent';
    }

    render() {

      return (
        <div className="agreement-list-item">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="media">
                <div className="media-left">
                  <div className="agreement-list-counterparty-image">
                    <Link to={`/agreements/${this.props.agreement.id}`} className="agreement-list-agreement-name">
                      <img className="media-object" src="/assets/images/medium-logo-no-text.svg"
                           alt="counterparty image"/>
                    </Link>
                  </div>

                </div>

                <div className="media-body">

                  <h5 className="media-heading">
                    <Link to={`/agreements/${this.props.agreement.id}`} className="agreement-list-agreement-name">
                      {this.props.agreement.name}
                    </Link>
                  </h5>

                  <div className="content-section-item space-top-sm agreement-list-agreement-details">

                    <span>{this.props.agreement.counterparty}</span>
                    <i className="fa fa-circle middle space-left space-right" />

                    <span>
                      <i className="fa fa-file space-right-md" />
                      {this.props.agreement.typeName}
                    </span>

                    <i className="fa fa-circle middle space-left space-left space-right" />

                    <span>Executed on {this.props.agreement.executionDate}</span>
                    <i className="fa fa-circle middle space-left space-left space-right" />

                    <span>Modified on {this.props.agreement.modificationDate}</span>
                    <i className="fa fa-circle middle space-left space-left space-right" />

                    <span>{this.props.agreement.artifactCount} documents</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }

  }

  return new DependencyProvider(Component);
}
