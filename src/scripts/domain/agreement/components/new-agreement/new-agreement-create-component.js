'use strict';

import React from 'react';
import Router  from 'react-router';

import Flummox from 'flummox';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link} = Router;

export default function (persistenceApiServiceUrl, fileUploadProvider) {

  const contractUrl  = `${persistenceApiServiceUrl}/api/agreements/`;
  const FileUploader = fileUploadProvider.dependency;

  const component = React.createClass({
    displayName: "NewAgreementCreateComponent",

    contextTypes: {
      flux: React.PropTypes.instanceOf(Flummox)
    },

    onAddedFile(file) {
      const agreementActions = this.context.flux.getActions('AgreementActions');
      agreementActions.contractUploadBegan(file);
    },

    onProgressed(progress) {
      agreementActions.uploadContractProgressed(progress);
    },

    onComplete(file) {
      agreementActions.uploadContractCompleted(file);
    },

    render() {
      return (
        <div id="new-agreement-wrapper">
          <div id="create-agreement-wrapper">
            <div className="content-section  space-top space-bottom">
              <div className="container">
                <h1 className="page-header">New Contract</h1>
              </div>
            </div>

            <div className="content-section ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-24">
                    <div className="panel panel-default import-agreement-panel">
                      <div className="panel-heading">
                        Import Contract
                      </div>
                      <div className="panel-body">

                        <FileUploader url={contractUrl} onAddedFile={this.onAddedFile} onProgressed={this.onProgressed}
                                      onComplete={this.onComplete}
                                      className="import-agreement-container dropzone">
                          <i className="fa fa-cloud-upload"></i>

                          <div className="primary-import-text">Select a file to upload</div>
                          <div className="secondary-import-text">
                            <span>Or drag and drop a file</span>
                          </div>
                        </FileUploader>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-section  space-top-lg space-bottom">
              <div className="container-fluid">
                <section className="generate-agreement-section">
                  <div className="row">
                    <div className="col-md-24">

                      <div className="content-section-item">
                        <h4>
                          <span>OR</span>
                        </h4>
                      </div>
                      <div className="content-section-item space-top-lg">

                        <Link activeClassName={""} to="createAgreement" className="btn btn-default btn-lg">Generate New
                          Contract
                          From
                          Template</Link>
                      </div>
                    </div>
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
