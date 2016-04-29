'use strict';

import React from 'react';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

import cx from 'classnames';

export default function () {

  const component = React.createClass({
    displayName: "ComingSoonComponent",

    render() {

      return (
        <div className="coming-soon-wrapper">
          <div>
            <div className="content-section  space-top space-bottom">
              <div className="container">
                <h1 className="page-header">Coming Soon</h1>
              </div>
            </div>

            <div className="content-section space-bottom">
              <div className="container">
                <section className="row content-section-item space-top-sm">
                  <div className="col-md-24">
                    <p>
                      This feature is not yet available. Please send an email to <a className="underline"
                                                                                    href="mailto:support@startwillow.com"
                                                                                    target="_blank">support@startwillow.com</a>
                      &nbsp;if you need any help.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
