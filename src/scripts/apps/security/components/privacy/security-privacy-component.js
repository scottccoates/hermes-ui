'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import cx from 'classnames';

export default function () {

  const component = React.createClass({
    displayName: "SecurityPrivacyComponent",

    render() {

      return (
        <div className="security-privacy-wrapper">
          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Privacy and Security</h1>
            </div>
          </div>

          <div className="content-section space-bottom">
            <div className="container">
              <h3 className="content-section-header">Encryption</h3>
              <section className="row content-section-item space-top-sm">
                <div className="col-md-24">
                  <p>
                    We use state-of-the-art encryption standards. This includes 256-bit SSL encryption, the same
                    technology major financial institutions, health systems, and governments use to keep your data
                    secure.
                  </p>

                  <p className='content-section-item space-top-sm'>
                    All information regarding your account, including your passwords and uploaded documents, are
                    encrypted using this standard.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="content-section space-bottom">
            <div className="container">
              <h3 className="content-section-header">Backups</h3>
              <section className="row content-section-item space-top-sm">
                <div className="col-md-24">
                  <p>
                    We use cutting edge backup and firewall technology, the same technology employed by some of the
                    world’s largest companies such as Netflix, Amazon, and Google.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="content-section space-bottom">
            <div className="container">
              <h3 className="content-section-header">Protected at Every Step</h3>
              <section className="row content-section-item space-top-sm">
                <div className="col-md-24">
                  <p>
                    Willow was developed entirely in house, using proven technology. We take immense pride in the
                    quality and the security of our software. As such, we adhere to industry standards for protecting
                    your data and your confidentiality. We’ve created policies across our company and our application to
                    ensure the highest level of security.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
