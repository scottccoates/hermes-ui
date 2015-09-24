'use strict';

import React from 'react';

import cx from 'classnames';

import NProgress from 'nprogress';

import {Navigation} from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (persistenceApiServiceUrl, fileUploadProvider, nprogressBarFactory) {

  const contractUrl  = `${persistenceApiServiceUrl}/api/agreements/`;
  const FileUploader = fileUploadProvider.dependency;

  var component = React.createClass({
    displayName: "NewAgreementCreateComponent",

    mixins: [Navigation],

    getInitialState(){
      return {uploading: false};
    },

    componentWillMount(){
      debugger
      this.nprogressBar = nprogressBarFactory.get({
        parent: '#important-agreement-feedback-progress',
        showSpinner: false,
        trickleRate: .02,
        trickleSpeed: 800,
        speed: 200
      });
    },

    componentWillUnmount() {
      debugger
      nprogressBarFactory.dispose(this.nprogressBar);
      this.nprogressBar = null;
    },

    onAddedFile() {
      this.setState({uploading: true});
      this.nprogressBar.updateProgress();
    },

    onProgressed(progress) {
      this.nprogressBar.updateProgress(progress);
    },

    onComplete() {
      this.nprogressBar.updateProgress(100);
      //this.transitionTo('/agreements/step_2');
      console.log("done");
    },

    render() {
      const dropzoneClasses = cx({'dropzone': true, 'hidden': this.state.uploading});
      const feedbackClasses = cx({'important-agreement-feedback': true, 'hidden': !this.state.uploading});

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
                        <div className="import-agreement-container">
                          <FileUploader url={contractUrl} onAddedFile={this.onAddedFile}
                                        onProgressed={this.onProgressed}
                                        onComplete={this.onComplete}
                                        className={dropzoneClasses}
                                        paramName="contract"
                                        acceptedFiles=".pdf">
                            <i className="fa fa-cloud-upload"></i>

                            <div className="primary-import-text">Select a file to upload</div>
                            <div className="secondary-import-text">
                              <span>Or drag and drop a file</span>
                            </div>
                          </FileUploader>

                          <div className={feedbackClasses}>

                            <h3 className="feedback-text">Importing Contract</h3>

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
                          Contract
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
