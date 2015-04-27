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
              </div>
              <div className='col-sm-4'>
                <img alt="header profile image" className="search-result-counterparty-image img-responsive"
                     src="/build/assets/images/man-profile-pic.jpg"/>
              </div>
              <div className='col-sm-20'>
                <h5 className='search-result-mi-name'>
                  Licensing Agreement for Intellectual Property
                </h5>

                <div className='search-result-mi-details'>
                            <span className='search-result-mi-detail'>
                              Google, Inc.
                            </span>

                  <i className='fa fa-circle'></i>

                            <span className='search-result-mi-detail'>
                              <i className='fa fa-file'></i> License
                            </span>

                  <i className='fa fa-circle'></i>

                            <span className='search-result-mi-detail'>
                              2 upcoming tasks
                            </span>
                </div>
                <div className='search-result-mi-content'>
                  <p>
                    <Highlighter search="confidential disclosure" caseSensitive={false}>
                      … Confidential disclosure Information. I understand that “Confidential Information” means
                      information and physical material not generally known or … outside the Company and
                      information and physical material entrusted to the Company in confidence by third parties.
                      Confidential Disclosure Information includes, without limitation …
                    </Highlighter>
                  </p>
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
