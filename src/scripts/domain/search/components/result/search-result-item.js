'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Highlighter from 'react-highlighter';

const {Link, RouteHandler} = Router;

export default function () {

  const component = React.createClass({
    render() {
      return (
        <div className="search-item">
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className='row'>
                <div className='col-sm-4'>
                  <img alt="header profile image" className="search-result-counterparty-image img-responsive"
                       src={this.props.searchResultImage}/>
                </div>
                <div className='col-sm-20'>
                  <h5 className='content-section-item'>
                    <a className='search-result-mi-name' href="#">{this.props.searchResultSubject}</a>
                  </h5>

                  <div className='search-result-mi-details content-section-item space-top-xxs space-bottom-xxs'>
                            <span className='search-result-mi-detail'>
                              {this.props.searchResultOwner}
                            </span>

                    <i className='fa fa-circle middle space-left space-right'></i>

                            <span className='search-result-mi-detail'>
                              <i className='fa fa-file space-right-md'></i>
                              {this.props.searchResultEntityType}
                            </span>

                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                            <span className='search-result-mi-detail'>
                              {this.props.searchResultAdditionalDetails}
                            </span>
                  </div>
                  <div className='search-result-mi-content content-section-item'>
                    <p>
                      <Highlighter search="licensee(\'s)? | terminate" caseSensitive={false}>
                        {this.props.searchResultContent}
                      </Highlighter>
                    </p>
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
