import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (agreementService) {

  const agreementDetailDocuments = React.createClass({
    displayName: "AgreementDetailArtifactsComponent",

    async downloadArtifact(artifactId){
      const url = await agreementService.getAgreementArtifactSignedUrl(artifactId);
      window.open(url, '_blank');
    },

    render() {
      const documentNodes = this.props.agreement.artifacts.map(artifact=> {
        return (
          <li className="content-section-item space-bottom-sm" key={artifact.id}>
            <a href="javascript:void(0)" onClick={this.downloadArtifact.bind(this, artifact.id)}>
              <div>
                <i className="fa fa-file-pdf-o space-right"></i>
                <span>{artifact.name}</span>
              </div>
            </a>
          </li>
        );
      });

      return (
        <div className="agreement-detail-documents">
          <ul className="agreement-detail-documents-list">
            {documentNodes}
          </ul>
        </div>
      );
    }
  });

  return new DependencyProvider(agreementDetailDocuments);
};
