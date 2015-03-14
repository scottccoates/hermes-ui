'use strict';

import React from 'react';
import Router  from 'react-router';
import FileUploader from 'src/app/components/file-uploader';

const {Link} = Router;

const NewManagementItem = React.createClass({
  render: function () {
    return (
        <div id="new-mi-wrapper">
          <h1 className="page-header">New Contract</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default import-mi-panel">
                <div className="panel-heading">
                  Import Contract
                </div>
                <div className="panel-body">

                  <FileUploader url="test/test" className="import-mi-container dropzone">
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
              <div className="col-md-12">
                <h4>
                  <span>Or</span>
                </h4>
                <Link activeClassName={""} to="new" className="btn btn-default btn-lg">Generate New Contract From Template</Link>
              </div>
            </div>
          </section>
        </div>
    );
  }
});

export default NewManagementItem;
