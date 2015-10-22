import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  const agreementDetailDocuments = React.createClass({
    displayName: "AgreementDetailArtifactsComponent",

    render() {
      const documentNodes = this.props.agreement.artifacts.map(document=> {
        return (
          <li className="content-section-item space-bottom-sm" key={document.id}>
            <a href="javascript:void(0)">
              <div>
                <i className="fa fa-file-pdf-o space-right"></i>
                <span>{document.name}</span>
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
