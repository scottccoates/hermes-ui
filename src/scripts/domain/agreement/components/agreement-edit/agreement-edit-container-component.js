import React from 'react';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementActions, agreementTypeService, agreementEditFormComponent) {

  const AgreementEditForm = agreementEditFormComponent.dependency;

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementEditContainer';
    }

    componentWillMount() {
      agreementActions.requestAgreementEdit(this.props.params.agreementId);
    }

    onValid(data) {
      agreementActions.saveAgreement(Object.assign({}, data, {
        id: this.props.params.agreementId
      }));
    }

    async onCreateAgreementType(agreementType) {
      const newAgreementType = await agreementTypeService.saveAgreementType({name: agreementType});
      return newAgreementType;
    }

    onInvalid() {
      // give some time for render to do it's thing and provide has-error class
      setTimeout(
        _=> {
          const firstErrorElementGroup = document.querySelector('.has-error');

          if (firstErrorElementGroup) {

            firstErrorElementGroup.scrollIntoView(firstErrorElementGroup, {
              block: 'start',
              behavior: 'smooth'
            });
          }
        }, 100);
    }

    render() {
      let initialValues = undefined;

      if (this.props.agreementEdit.agreement.id) {
        initialValues = this.props.agreementEdit.agreement;
      }

      return (
        <div id="agreement-edit-container-wrapper">
          <div className="content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Edit Agreement</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <AgreementEditForm form="agreementEditContainerForm"
                                 onValid={this.onValid} onInvalid={this.onInvalid}
                                 initialValues={initialValues}
                                 counterparties={this.props.userCounterparties.counterparties}
                                 agreementTypes={this.props.userAgreementTypes.agreementTypes}
                                 onCreateAgreementType={this.onCreateAgreementType}/>
            </div>
          </div>
        </div>
      );
    }
  }

  function extracted(state) {
    return {
      agreementEdit: state.agreementEdit,
      userAgreementTypes: state.userAgreementTypes,
      userCounterparties: state.userCounterparties
    };
  }

  return new DependencyProvider(connect(extracted)(Component));
}
