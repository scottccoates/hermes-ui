'use strict';

import React from 'react';

import cx from 'classnames';

import NProgress from 'nprogress';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (persistenceApiServiceUrl, fileUploadProvider, nprogressBarFactory) {

  const agreementUrl = `${persistenceApiServiceUrl}/agreements/`;
  const FileUploader = fileUploadProvider.dependency;

  var component = React.createClass({
    displayName: "AgreementNewCreateComponent",

    getInitialState(){
      return {uploading: false};
    },

    componentWillMount(){
      this.nprogressBar = nprogressBarFactory.get({
        parent: '#important-agreement-feedback-progress',
        showSpinner: false,
        trickleRate: .02,
        trickleSpeed: 800,
        speed: 200
      });
    },

    componentWillUnmount() {
      nprogressBarFactory.dispose(this.nprogressBar);
      this.nprogressBar = null;
    },

    onAddedFile() {
      this.setState({uploading: true});
      this.nprogressBar.updateProgress();
    },

    onProgressed(progress) {
      // if we hit 100 here, it'll appear to finish twice
      var newProgress = progress >= 100 ? 99 : progress;

      this.nprogressBar.updateProgress(newProgress);
    },

    onSuccess(file, response) {
      this.nprogressBar.updateProgress(100);
      // https://app.asana.com/0/10235149247647/48987687687033
      setTimeout(_=> this.props.history.pushState(null, `/agreements/${response.id}/step-2`), 500);
    },

    onError(file, errorMessage) {
      alert('There was an error processing your file.');
    },

    render() {
      const dropzoneClasses = cx({'dropzone': true, 'hidden': this.state.uploading});
      const feedbackClasses = cx({'important-agreement-feedback': true, 'hidden': !this.state.uploading});

      return (
        <div id="agreement-new-wrapper">
          <div id="create-agreement-wrapper">
            <div className="content-section  space-top space-bottom">
              <div className="container">
                <h1 className="page-header">New Agreement</h1>
              </div>
            </div>

            <div className="content-section ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-24">
                    <div className="panel panel-default import-agreement-panel">
                      <div className="panel-heading">
                        Import Agreement
                      </div>
                      <div className="panel-body">
                        <div className="import-agreement-container">
                          <FileUploader url={agreementUrl} onAddedFile={this.onAddedFile}
                                        onProgressed={this.onProgressed}
                                        onSuccess={this.onSuccess}
                                        onError={this.onError}
                                        className={dropzoneClasses}
                                        paramName="artifacts"
                                        headers={{"Authorization": "JWT " + this.props.user.token}}
                                        acceptedFiles=".pdf, .doc, .docx">
                            <i className="fa fa-cloud-upload"></i>

                            <div className="primary-import-text">Select files to upload</div>
                            <div className="secondary-import-text">
                              <span>Or drag and drop files</span>
                            </div>
                          </FileUploader>

                          <div className={feedbackClasses}>

                            <h3 className="feedback-text">Importing Agreement</h3>

                            <div id="important-agreement-feedback-progress">
                            </div>

                          </div>
                        </div>
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

                        <a href="javascript:void(0)" className="btn btn-default btn-lg">Generate New
                          Agreement
                          From
                          Template</a>
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
