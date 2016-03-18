import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import { connect } from 'react-redux';

import {Link}  from 'react-router';

export default function (agreementActions, agreementDetailGeneralInfoComponent, agreementDetailLengthComponent, agreementDetailArtifactsComponent) {
  const AgreementDetailGeneralInfo = agreementDetailGeneralInfoComponent.dependency;
  const AgreementDetailLength      = agreementDetailLengthComponent.dependency;
  const AgreementDetailArtifacts   = agreementDetailArtifactsComponent.dependency;

  var component = React.createClass({
    displayName: "AgreementDetailContainerComponent",

    componentWillMount(){
      this.props.requestAgreementDetail(this.props.params.agreementId);
    },

    deleteAgreement(){
      agreementActions.deleteAgreement(this.props.params.agreementId);
    },

    deleteArtifact(agreementId, artifactId){
      agreementActions.deleteArtifact(agreementId, artifactId);
    },

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

                    <h3 className="content-section-header">General Agreement Information</h3>

                    <div className='row'>
                      <div className="content-section">
                        <div className='col-sm-20'>
                          <AgreementDetailGeneralInfo agreement={this.props.agreement}/>
                        </div>

                        <div className='col-sm-4 edit-link'>
                          <Link to={`/agreements/${this.props.agreement.id}/edit`}>
                            <div>
                              {/*the div makes the entire space hoverable*/}
                              <i className="fa fa-pencil space-right-md"></i>
                              <span>edit</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-section space-top space-bottom">

                    <h3 className="content-section-header">Agreement Duration and Renewal Information</h3>

                    <div className='row'>
                      <div className="content-section">
                        <div className='col-sm-20'>
                          <AgreementDetailLength agreement={this.props.agreement}/>
                        </div>

                        <div className='col-sm-4 edit-link'>
                          <Link to={`/agreements/${this.props.agreement.id}/edit`}>
                            <div>
                              {/*the div makes the entire space hoverable*/}
                              <i className="fa fa-pencil space-right-md"></i>
                              <span>edit</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='panel panel-alt'>
                    <div className='panel-body'>
                      <h3 className="content-section-header">Documents</h3>
                      <AgreementDetailArtifacts agreement={this.props.agreement} deleteArtifact={this.deleteArtifact}/>
                    </div>
                  </div>

                  <div className='delete-link content-section-item space-top-sm'>
                    <a href='javascript:void(0)' onClick={this.deleteAgreement}>
                      <div>
                        {/*the div makes the entire space hoverable*/}
                        <i className="fa fa-close space-right-md"></i>
                        <span>Delete Agreement</span>
                      </div>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );

      return retVal;
    }
  });

  component = connect(x=> x.agreementDetail, agreementActions)(component);

  return new DependencyProvider(component);
};
