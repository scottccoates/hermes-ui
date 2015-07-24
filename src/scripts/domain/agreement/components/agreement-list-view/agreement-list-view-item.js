'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;


export default function () {

  const component = React.createClass({
    displayName: "agreementListViewItem",
    render() {
      return (
        <div className="agreement-list-view-item">
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className="media">
                <div className="media-left">
                  <div className="agreement-list-view-counterparty-image">
                    <a href="#">
                      <img className="media-object" src={this.props.agreement.image} alt="counterparty image"/>
                    </a>
                  </div>

                </div>

                <div className="media-body">

                  <h5 className="media-heading">
                    <a className='agreement-list-view-agreement-name' href="#">{this.props.agreement.name}</a>
                  </h5>

                  <div className='content-section-item space-top-sm agreement-list-view-agreement-details'>

                    <span>{this.props.agreement.counterparty}</span>
                    <i className='fa fa-circle middle space-left space-right'></i>

                    <span>{this.props.agreement.status}</span>
                    <i className='fa fa-circle middle space-left space-right'></i>

                    <span>
                      <i className='fa fa-file space-right-md'></i>
                      {this.props.agreement.type}
                    </span>
                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                    <span>Expires on {this.props.agreement.expirationDate.toTimeString()}</span>
                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                    <span>Modified on {this.props.agreement.modifiedDate.toTimeString()}</span>
                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                    <span>{this.props.agreement.documentCount} documents</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }

  });

  return new DependencyProvider(component);
};
