'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

import Actions from 'src/apps/management-item/actions';

const {Link} = Router;

export default function (FileUploadProvider) {

  const FileUploader = FileUploadProvider.componentType;

  const component = React.createClass({
    onAddedFile(file) {
      Actions.newMIFileUpload(file);
    },

    onProgressed(progress) {
      Actions.newMIFileUpload.progressed(progress);
    },
    onComplete() {
      Actions.newMIFileUpload.completed();
    },

    render() {
      return (
          <div id="new-mi-wrapper" className="container-fluid">
            <h1 className="page-header">New Contract</h1>
            <div className="row">
              <div className="col-md-24">
                <div className="panel panel-default import-mi-panel">
                  <div className="panel-heading">
                    Import Contract
                  </div>
                  <div className="panel-body">

                    <FileUploader url="test/test" onAddedFile={this.onAddedFile} onProgressed={this.onProgressed} onComplete={this.onComplete}
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
            <section className="create-mi-section">
              <div className="row">
                <div className="col-md-24">
                  <h4>
                    <span>Or</span>
                  </h4>
                  <Link activeClassName={""} to="newMI" className="btn btn-default btn-lg">Generate New Contract From Template</Link>
                </div>
              </div>
            </section>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
