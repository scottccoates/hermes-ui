'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/scripts/libs/react-js/components/component-provider';

import Actions from 'src/scripts/apps/management-item/actions/actions';

const {Link} = Router;

export default function (fileUploadProvider) {

  const FileUploader = fileUploadProvider.componentType;

  const component = React.createClass({
    onAddedFile(file) {
      Actions.createMIFileUpload(file);
    },

    onProgressed(progress) {
      Actions.createMIFileUpload.progressed(progress);
    },
    onComplete() {
      Actions.createMIFileUpload.completed();
    },

    render() {
      return (
        <div id="new-mi-wrapper">
          <div className="content-section default-content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">New Contract</h1>
            </div>
          </div>

          <div className="content-section default-content-section">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-24">
                  <div className="panel panel-default import-mi-panel">
                    <div className="panel-heading">
                      Import Contract
                    </div>
                    <div className="panel-body">

                      <FileUploader url="test/test" onAddedFile={this.onAddedFile} onProgressed={this.onProgressed}
                                    onComplete={this.onComplete}
                                    addedfile={()=> {
                        }} className="import-mi-container dropzone">
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

          <div className="content-section default-content-section space-top-lg space-bottom">
            <div className="container-fluid">
              <section className="generate-mi-section">
                <div className="row">
                  <div className="col-md-24">

                    <div className="content-section-item">
                      <h4>
                        <span>Or</span>
                      </h4>
                    </div>
                    <div className="content-section-item space-top-lg">

                      <Link activeClassName={""} to="createMI" className="btn btn-default btn-lg">Generate New Contract
                        From
                        Template</Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }
  });

  return new ComponentProvider(component);
};
