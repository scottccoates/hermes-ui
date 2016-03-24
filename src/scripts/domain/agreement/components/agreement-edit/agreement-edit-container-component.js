'use strict';

import React from 'react';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (agreementActions, agreementTypeService, agreementEditFormComponent) {

  const AgreementEditForm = agreementEditFormComponent.dependency;

  var component = React.createClass({
    displayName: "AgreementEditContainer",

    componentWillMount(){
      agreementActions.requestAgreementEdit(this.props.params.agreementId);
    },

    onValid(data){
      agreementActions.saveAgreement(Object.assign({}, data, {
        agreementId: this.props.params.agreementId
      }));
    },

    async onCreateAgreementType(agreementType){
      const newAgreementType = await agreementTypeService.saveAgreementType({name: agreementType});
      return newAgreementType;
    },

    onInvalid()    {
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
    },

    render() {
      const today = new Date(new Date().setHours(0, 0, 0, 0, 0));
      // https://github.com/erikras/redux-form/issues/547
      const defaults = {
        autoRenew: true,
        counterparty: '',
        description: '',
        durationDetails: '',
        executionDate: today,
        name: '',
        outcomeNoticeTimeAmount: 30,
        outcomeNoticeTimeType: 'day',
        termLengthTimeAmount: '',
        termLengthTimeType: 'year',
        typeId: null,
        outcomeAlertEnabled: true,
        outcomeAlertTimeAmount: 30,
        outcomeAlertTimeType: 'day',
        outcomeNoticeAlertEnabled: true,
        outcomeNoticeAlertTimeAmount: 30,
        outcomeNoticeAlertTimeType: 'day'
      };

      const agreement = Object.assign({}, defaults, this.props.agreementEdit.agreement);

      return (
        <div id="agreement-edit-container-wrapper">
          <div className="content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Edit Agreement</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <AgreementEditForm form='agreementEditContainerForm'
                                 onValid={this.onValid} onInvalid={this.onInvalid}
                                 initialValues={agreement}
                                 counterparties={this.props.userCounterparties.counterparties}
                                 agreementTypes={this.props.userAgreementTypes.agreementTypes}
                                 onCreateAgreementType={this.onCreateAgreementType}/>
            </div>
          </div>
        </div>
      );
    }
  });

  function extracted(state) {
    return {
      agreementEdit: state.agreementEdit,
      userAgreementTypes: state.userAgreementTypes,
      userCounterparties: state.userCounterparties
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
