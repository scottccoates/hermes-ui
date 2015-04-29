'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/react-js/components/component-provider';

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
                       src="/build/assets/images/microsoft-logo.png"/>
                </div>
                <div className='col-sm-20'>
                  <h5 className='content-section-item'>
                    <a className='search-result-mi-name' href="#">Licensing Agreement Between Microsoft and Hermes, Inc.
                      for Microsoft Office Suite Products</a>
                  </h5>

                  <div className='search-result-mi-details content-section-item space-top-xxs space-bottom-xxs'>
                            <span className='search-result-mi-detail'>
                              Microsoft
                            </span>

                    <i className='fa fa-circle middle space-left space-right'></i>

                            <span className='search-result-mi-detail'>
                              <i className='fa fa-file'></i> Licensing Agreement
                            </span>

                    <i className='fa fa-circle middle space-left space-left space-right'></i>

                            <span className='search-result-mi-detail'>
                              2 upcoming tasks
                            </span>
                  </div>
                  <div className='search-result-mi-content content-section-item'>
                    <p>
                      <Highlighter search="licensee(\'s)? | terminate" caseSensitive={false}>
                        … within a reasonable period, Licensee's sole recourse shall be to terminate the Agreement and
                        Licensor's sole obligation shall be … Licensee Right to Terminate. Licensee shall have the right
                        to … all rights granted to Licensee under this Agreement shall forthwith terminate and
                        immediately revert to Licensor and …
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

  return new ComponentProvider(component);
};
