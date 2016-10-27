import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (agreementService, persistenceApiServiceUrl, fileUploadProvider) {
  const FileUploader = fileUploadProvider.dependency;

  const agreementDetailArtifacts = React.createClass({
    displayName: "AgreementDetailArtifactsComponent",

    async downloadArtifact(artifactId){
      const url = await agreementService.getAgreementArtifactSignedUrl(artifactId);
      window.open(url, '_blank');
    },

    deleteArtifact(agreementId, artifactId){
      this.props.deleteArtifact(agreementId, artifactId);
    },

    onError(file, errorMessage) {
      alert('There was an error processing your file.');
    },

    render() {
      const artifactUrl = `${persistenceApiServiceUrl}/agreements/${this.props.agreement.id}/artifacts/`;

      const artifactNodes = this.props.agreement.artifacts.map(artifact=> {
        return (
          <li className="content-section-item space-bottom-sm clearfix" key={artifact.id}>
            <a href="javascript:void(0)" onClick={this.downloadArtifact.bind(this, artifact.id)}>
              <div className='col-sm-3 no-left-gutter gutter-xs'>
                <i className="fa fa-file-pdf-o"></i>
              </div>
              <div className='col-sm-18 gutter-xs'>
                <span>{artifact.name}</span>
              </div>
            </a>

            <a href="javascript:void(0)" onClick={this.deleteArtifact.bind(this, this.props.agreement.id, artifact.id)}>
              <div className='col-sm-3 gutter-xs'>
                <i className="fa fa-close"></i>
              </div>
            </a>
          </li>
        );
      });

      return (
        <div className="agreement-detail-artifacts">
          <ul className="agreement-detail-artifacts-list">
            {artifactNodes}
            <li className="content-section-item space-top-md clearfix">
              <FileUploader url={artifactUrl}
                            onSuccess={this.onSuccess}
                            onError={this.onError}
                            className='dropzone'
                            paramName="artifacts"
                            headers={{"Authorization": "JWT " + this.props.loginMeta.token}}
                            acceptedFiles=".pdf, .doc, .docx">
                <div className='col-sm-3 no-left-gutter gutter-xs'>
                  <i className="fa fa-cloud-upload"></i>
                </div>
                <div className='col-sm-21 gutter-xs'>
                  <span>Upload Document</span>
                </div>
              </FileUploader>
            </li>
          </ul>
        </div>
      );
    }
  });

  return new DependencyProvider(agreementDetailArtifacts);
};
