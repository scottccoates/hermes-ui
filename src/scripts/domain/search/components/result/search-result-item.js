'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Highlighter from 'react-highlighter';

const {Link} = Router;

export default function () {

  const component = React.createClass({
    displayName: "SearchResultItem",

    render() {
      return (
        <div className="search-result-item">
          <div className='panel panel-default'>
            <div className='panel-body'>
              <div className='row'>
                <div className='col-sm-4'>
                  <img alt="counterparty image" className="img-responsive"
                       src={this.props.searchResultImage}/>
                </div>
                <div className='col-sm-20'>
                  <h5 className='content-section-item'>
                    <a className='search-result-agreement-name' href="javascript:void(0)">{this.props.searchResultSubject}</a>
                  </h5>

                  <div className='search-result-agreement-details content-section-item space-top-xxs space-bottom-xxs'>
                            <span className='search-result-agreement-detail'>
                              {this.props.searchResultOwner}
                            </span>

                    <i className='fa fa-circle middle space-left space-right'></i>

                            <span className='search-result-agreement-detail'>
                              <i className='fa fa-file space-right-md'></i>
                              {this.props.searchResultEntityType}
                            </span>

                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                            <span className='search-result-agreement-detail'>
                              {this.props.searchResultAdditionalDetails}
                            </span>
                  </div>
                  <div className='search-result-agreement-content content-section-item'>
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
