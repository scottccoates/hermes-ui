'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import {reduxForm, Field} from 'redux-form';

import Select from 'react-select';

import cx from 'classnames';

import ButtonSelect from '../../../../libs/react-js/components/button-select';

import Datepicker from 'react-datepicker';

import moment from 'moment';

import {required, integer} from '../../../../libs/js-utils/validation/validation-utils';

import {normalizeFormValues} from '../../../../libs/js-utils/form/form-utils';

import agreementValueLabel from '../../../../apps/formatting/agreement/agreement-value-label';

import formattingService from '../../../../apps/formatting/services/formatting-service';

const {timeTypes, renewTypes} = agreementValueLabel;


import formWrapper from '../../../../libs/redux-js/components/redux-form-wrapper';

function validate(values) {
  const errors = {};

  errors.name                         = required(values.name, 'Name is required');
  errors.counterparty                 = required(values.counterparty, 'Counterparty is required');
  errors.termLengthTimeAmount         = integer(values.termLengthTimeAmount, 'Term length must be a number');
  errors.outcomeNoticeTimeAmount      = integer(values.outcomeNoticeTimeAmount, 'Outcome notice must be a number');
  errors.outcomeAlertTimeAmount       = integer(values.outcomeAlertTimeAmount, 'Outcome alert must be a number');
  errors.outcomeNoticeAlertTimeAmount = integer(values.outcomeNoticeAlertTimeAmount, 'Outcome notice alert must be a number');

  return errors;
}

function renderedInput(field) {
  debugger
  return <div>
    <input className="form-control" {...field.input} type={field.type}/>
    {touched &&  (warning && <span>{warning}</span>)}

    {field.meta.touched &&
    field.meta.error &&
    <span >{field.meta.error}</span>}
  </div>;
}

export default function () {

  const today    = new Date(new Date().setHours(0, 0, 0, 0, 0));
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

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AgreementEditFormComponent';
    }

    onChangeCounterparty(newVal, newValState) {
      // counterparties don't have ID's yet - they're just strings.

      let counterpartyValue = null;

      if (newValState.length) {
        counterpartyValue = newValState[0].label;
      }

      this.props.fields.counterparty.onChange(counterpartyValue);

      this.props.touch('counterparty');
    }

    async onChangeAgreementType(newVal, newValState) {
      let typeId = null;

      if (newVal) {
        if (newValState[0].create) {
          const newAgreementType = await this.props.onCreateAgreementType(newVal);
          this.props.fields.typeId.onChange(newAgreementType.id);
        }
        else {
          typeId = newVal;
          this.props.fields.typeId.onChange(typeId);
        }
      }
      else {
        this.props.fields.typeId.onChange(typeId);
      }

      this.props.touch('typeId');
    }

    onChangeExecutionDate(newVal) {
      this.props.fields.executionDate.onChange(newVal.toDate());
    }

    onChangeTermLengthTimeType(newVal) {
      this.props.fields.termLengthTimeType.onChange(newVal);
    }

    onChangeAutoRenew(newVal) {
      this.props.fields.autoRenew.onChange(newVal);
    }

    onChangeOutcomeNoticeTimeType(newVal) {
      this.props.fields.outcomeNoticeTimeType.onChange(newVal);
    }

    onChangeOutcomeNoticeAlertTimeType(newVal) {
      this.props.fields.outcomeNoticeAlertTimeType.onChange(newVal);
    }

    onChangeOutcomeAlertTimeType(newVal) {
      this.props.fields.outcomeAlertTimeType.onChange(newVal);
    }

    onSubmit(values) {
      //transform values https://github.com/erikras/redux-form/issues/554#issuecomment-172088797
      const transform = {
        termLengthTimeAmount: parseInt,
        outcomeNoticeTimeAmount: parseInt,
        outcomeAlertTimeAmount: parseInt,
        outcomeNoticeAlertTimeAmount: parseInt,
      };
      const newValues = normalizeFormValues(values, transform);
      this.props.onValid(newValues);
    }

    render() {
      const {handleSubmit} = this.props;

      // counterparty doesn't have an ID yet - it's just a string.
      let counterpartiesValues  = [];
      const counterpartiesTypes = this.props.counterparties;
      if (counterpartiesTypes.length) {
        counterpartiesValues = formattingService.getValueLabelFromArray(counterpartiesTypes);
      }

      let agreementTypesValues = [];
      const userAgreementTypes = this.props.agreementTypes;
      if (userAgreementTypes) {
        agreementTypesValues = formattingService.getValueLabelFromArray(userAgreementTypes);
      }

      const executionDateMoment = moment(new Date());
      //const executionDateMoment = moment(this.props.initialValue.executionDate);

      const defaultFormClasses = ['form-group'];
      //

      const name = {};

      const nameInvalid     = name.touched && name.invalid;
      const nameFormClasses = cx(defaultFormClasses, {'has-error': nameInvalid});

      const counterparty = {};
      const counterpartyInvalid     = counterparty.touched && counterparty.invalid;
      const counterpartyFormClasses = cx(defaultFormClasses, {'has-error': counterpartyInvalid});

      // execution date validation https://app.asana.com/0/25386196367554/104970225146858
      //const executionDateFormClasses = cx(defaultFormClasses, {'has-error': false});
      //
      //const termLengthTimeAmountInvalid = termLengthTimeAmount.touched && termLengthTimeAmount.invalid;
      //const termLengthFormClasses       = cx(defaultFormClasses, {'has-error': termLengthTimeAmountInvalid});
      //
      //const outcomeNoticeTimeAmountInvalid = outcomeNoticeTimeAmount.touched && outcomeNoticeTimeAmount.invalid;
      //const outcomeNoticeFormClasses       = cx(defaultFormClasses, {'has-error': outcomeNoticeTimeAmountInvalid});
      //
      //const outcomeAlertTimeAmountInvalid = outcomeAlertTimeAmount.touched && outcomeAlertTimeAmount.invalid;
      //const outcomeAlertFormClasses       = cx(defaultFormClasses, {'has-error': outcomeAlertTimeAmountInvalid});
      //
      //const outcomeNoticeAlertTimeAmountInvalid = outcomeNoticeAlertTimeAmount.touched && outcomeNoticeAlertTimeAmount.invalid;
      //const outcomeNoticeAlertFormClasses       = cx(defaultFormClasses, {'has-error': outcomeNoticeAlertTimeAmountInvalid});

      const submit = event => {
        // requires this setting below returnRejectedSubmitPromise: true
        // https://github.com/erikras/redux-form/issues/256
        const submitPromise = handleSubmit(this.onSubmit)(event);
        if (submitPromise) {
          submitPromise.catch(err => this.props.onInvalid(err));
        }
      };

      return (
        <div className="agreement-edit-form-wrapper">
          <form className="form-horizontal" onSubmit={submit}>
            <section className="row content-section-item space-bottom-xl">
              <div className="space-top-sm col-md-24">
                <h3 className="content-section-header">General Agreement Information</h3>

                <div className={nameFormClasses}>
                  <label htmlFor="agreement-form-name" className="col-sm-6 control-label">Agreement Name *</label>

                  <div className="col-sm-18">
                    <Field className='form-control'
                      name="name"
                      component={renderedInput}
                      type="text"/>
                    {/*<input autoFocus type="text" className="form-control" id="agreement-form-name" {...name}/>*/}
                    {/*nameInvalid && <div className="help-block">{name.error}</div>*/}
                  </div>
                </div>

                <div className={counterpartyFormClasses}>
                  <label htmlFor="agreement-form-counterparty" className="col-sm-6 control-label">Counterparty
                    *</label>

                  <div className="col-sm-18">

                    {counterpartyInvalid && <div className="help-block">{counterparty.error}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-6 control-label">Agreement Type</label>

                  <div className="col-sm-18">

                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="agreement-form-description" className="col-sm-6 control-label">Brief
                    Description</label>

                  <div className="col-sm-18">
                    <textarea rows="5" className="form-control" id="agreement-form-description"/>
                  </div>
                </div>

              </div>

            </section>
          </form>
        </div>
      );
    }
  }


  Component = reduxForm()(Component);

  return new DependencyProvider(Component, defaults);
}
