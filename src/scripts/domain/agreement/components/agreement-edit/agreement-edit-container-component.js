'use strict';

import React from 'react';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Agreement from '../../models/agreement-list-item-model';
import Select from 'react-select';
import Validation from 'rc-form-validation';

import cx from 'classnames';

import ButtonSelect from 'src/scripts/libs/react-js/components/button-select'

import {toNumber} from 'src/scripts/libs/js-utils/validation/validation-utils';
import {normalizeFormValues} from 'src/scripts/libs/js-utils/form/form-utils';

import agreementValueLabel from 'src/scripts/apps/formatting/agreement/agreement-value-label';

import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

const {Validator} = Validation;

const {timeTypes, renewTypes} = agreementValueLabel;

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
      return (
        <div id="agreement-edit-container-wrapper">
          <div className="content-section space-top space-bottom">
            <div className="container">
              <h1 className="page-header">Edit Agreement</h1>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <AgreementEditForm onValid={this.onValid} onInvalid={this.onInvalid}
                                 agreement={this.props.agreementEdit.agreement}
                                 agreementTypes={this.props.userAgreementTypes.agreementTypes}
                                 onCreateAgreementType={this.onCreateAgreementType}
                />
            </div>
          </div>
        </div>
      );
    }
  });

  function extracted(state) {
    return {
      agreementEdit: state.agreementEdit,
      userAgreementTypes: state.userAgreementTypes
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
