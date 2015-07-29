import React from 'react';

import ConnectToStores from 'flummox/connect';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (agreementDetailGeneralInfoComponent, agreementDetailLengthComponent, agreementDetailDocumentsComponent) {
  const AgreementDetailGeneralInfo = agreementDetailGeneralInfoComponent.dependency;
  const AgreementDetailLength      = agreementDetailLengthComponent.dependency;
  const AgreementDetailDocuments   = agreementDetailDocumentsComponent.dependency;

  const agreementDetailItem = React.createClass({
    displayName: "AgreementDetailContainerComponent",

    render() {
      var retVal = null;

      if (this.props.agreement.id)

        retVal = (
          <div id="agreement-detail-container-wrapper" className="alt-content-page">

            <div className="content-section alt-content-section space-top space-bottom">
              <div className="container">
                <h1 className="page-header">{this.props.agreement.name}</h1>
              </div>
            </div>

            <div className="container">
              <div className='row'>
                <div className='col-sm-18'>
                  <div className="content-section space-top">

                    <h3 className="content-section-header">General Contract Information</h3>

                    <div className='row'>
                      <div className="content-section">
                        <div className='col-sm-20'>
                          <AgreementDetailGeneralInfo agreement={this.props.agreement}/>
                        </div>

                        <div className='col-sm-4 edit-link'>
                          <a href="javascript:void(0)">
                            <div>
                              <i className="fa fa-pencil space-right-md"></i>
                              <span>edit</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-section space-top space-bottom">

                    <h3 className="content-section-header">Contract Duration and Renewal Information</h3>

                    <div className='row'>
                      <div className="content-section">
                        <div className='col-sm-20'>
                          <AgreementDetailLength agreement={this.props.agreement}/>
                        </div>

                        <div className='col-sm-4 edit-link'>
                          <a href="javascript:void(0)">
                            <div>
                              <i className="fa fa-pencil space-right-md"></i>
                              <span>edit</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='panel panel-alt'>
                    <div className='panel-body'>
                      <h3 className="content-section-header">Documents</h3>
                      <AgreementDetailDocuments agreement={this.props.agreement}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      return retVal;
    }
  });

  const agreementDetailComponent = ConnectToStores(agreementDetailItem, 'AgreementDetailStore');

  // probably best way to make this func available to router: https://github.com/acdlite/flummox/issues/173
  agreementDetailComponent.asyncTransition = (flux, state) => {
    const { agreementId } = state.params;
    const agreementActions = flux.getActions('AgreementActions');

    agreementActions.requestAgreementDetail(agreementId);
  };

  return new DependencyProvider(agreementDetailComponent);
};
