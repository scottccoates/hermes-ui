import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (agreementService) {

  const agreementDetailDocuments = React.createClass({
    displayName: "AgreementDetailArtifactsComponent",

    async downloadArtifact(artifactId){
      const url = await agreementService.getAgreementArtifactSignedUrl(artifactId);
      window.open(url, '_blank');
    },

    deleteArtifact(agreementId, artifactId){
      this.props.deleteArtifact(agreementId, artifactId);
    },

    render() {
      const documentNodes = this.props.agreement.artifacts.map(artifact=> {
        return (
          <li className="content-section-item space-bottom-sm clearfix" key={artifact.id}>
            <a href="javascript:void(0)" onClick={this.downloadArtifact.bind(this, artifact.id)}>
              <div className='col-sm-3 no-left-gutter gutter-xs'>
                <i className="fa fa-file-pdf-o space-right"></i>
              </div>
              <div className='col-sm-18 gutter-xs'>
                <span>{artifact.name}</span>
              </div>
            </a>

            <a href="javascript:void(0)" onClick={this.deleteArtifact.bind(this, this.props.agreement.id, artifact.id)}>
              <div className='col-sm-3 gutter-xs'>
                <i className="fa fa-close space-right"></i>
              </div>
            </a>
          </li>
        );
      });

      return (
        <div className="agreement-detail-artifacts">
          <ul className="agreement-detail-artifacts-list">
            {documentNodes}
          </ul>
        </div>
      );
    }
  });

  return new DependencyProvider(agreementDetailDocuments);
};
