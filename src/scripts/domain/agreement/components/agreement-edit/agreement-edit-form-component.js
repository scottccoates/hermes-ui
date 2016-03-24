'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import {reduxForm} from 'redux-form';

import Agreement from '../../models/agreement-list-item-model';
import Select from 'react-select';

import cx from 'classnames';

import ButtonSelect from 'src/scripts/libs/react-js/components/button-select'

import Datepicker from 'react-datepicker';

import moment from 'moment';

import {toNumber} from 'src/scripts/libs/js-utils/validation/validation-utils';
import {normalizeFormValues} from 'src/scripts/libs/js-utils/form/form-utils';

import agreementValueLabel from 'src/scripts/apps/formatting/agreement/agreement-value-label';

import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

const {timeTypes, renewTypes} = agreementValueLabel;

function validate(values) {
  return {name: 'oops'};
}

export default function () {

  let component = React.createClass({
    displayName: "AgreementEditFormComponent",

    //getInitialState() {
    //  // http://stackoverflow.com/questions/2698725/comparing-date-part-only-without-comparing-time-in-javascript
    //  const today = new Date(new Date().setHours(0, 0, 0, 0, 0));
    //  return {
    //    status: {
    //      autoRenew: {},
    //      counterparty: {},
    //      description: {},
    //      durationDetails: {},
    //      executionDate: {},
    //      name: {},
    //      outcomeNoticeTimeAmount: {},
    //      outcomeNoticeTimeType: {},
    //      termLengthTimeAmount: {},
    //      termLengthTimeType: {},
    //      outcomeNoticeAlertEnabled: {},
    //      outcomeNoticeAlertTimeAmount: {},
    //      outcomeNoticeAlertTimeType: {},
    //      expirationAlertEnabled: {},
    //      expirationAlertTimeAmount: {},
    //      expirationAlertTimeType: {}
    //    },
    //    formData: {
    //      autoRenew: false,
    //      counterparty: '',
    //      description: '',
    //      durationDetails: '',
    //      executionDate: today,
    //      name: '',
    //      outcomeNoticeTimeAmount: 30,
    //      outcomeNoticeTimeType: 'day',
    //      termLengthTimeAmount: '',
    //      termLengthTimeType: 'year',
    //      typeId: null,
    //      outcomeNoticeAlertEnabled: true,
    //      outcomeNoticeAlertTimeAmount: 30,
    //      outcomeNoticeAlertTimeType: 'day',
    //      expirationAlertEnabled: true,
    //      expirationAlertTimeAmount: 30,
    //      expirationAlertTimeType: 'day'
    //    }
    //  };
    //},

    //componentWillReceiveProps (nextProps) {
    //  // reset old form data if we switch from one agreement to another
    //  if (this.state.formData.id != nextProps.agreement.id) {
    //    this._setFormData(Object.assign({}, this.getInitialState().formData, nextProps.agreement));
    //  }
    //},

    _setFormData(val){
      this.setState({formData: Object.assign({}, this.state.formData, val)});
    },

    async onChangeAgreementType (newVal, newValState){
      let typeId = null;

      if (newVal) {
        if (newValState[0].create) {
          const newAgreementType = await this.props.onCreateAgreementType(newVal);
          this._setFormData({typeId: newAgreementType.id});
        }
        else {
          typeId = newVal;
          this._setFormData({typeId: typeId});
        }
      }
      else {
        this._setFormData({typeId: typeId});
      }

    },

    onChangeExecutionDate (newVal){
      this._setFormData({executionDate: newVal.toDate()});
    },

    onChangeTermLengthTimeType (newVal){
      this._setFormData({termLengthTimeType: newVal});
    },

    onChangeAutoRenew (newVal){
      this._setFormData({autoRenew: newVal});
    },

    onChangeOutcomeNoticeTimeType (newVal){
      this._setFormData({outcomeNoticeTimeType: newVal});
    },

    onChangeOutcomeNoticeAlertEnabled (newVal){
      // checkboxes don't work with this validation library
      // https://app.asana.com/0/10235149247655/60618870526792
      this._setFormData({outcomeNoticeAlertEnabled: newVal.target.checked});
    },

    onChangeOutcomeNoticeAlertTimeType (newVal){
      this._setFormData({outcomeNoticeAlertTimeType: newVal});
    },

    onChangeExpirationAlertEnabled (newVal){
      this._setFormData({expirationAlertEnabled: newVal.target.checked});
    },

    onChangeExpirationAlertTimeType (newVal){
      this._setFormData({expirationAlertTimeType: newVal});
    },

    onSubmit(event){
      event.preventDefault();
      var validation = this.refs.validation;

      // it's important to remember that validation is async (consider database calls, apis, existence in db, etc).
      validation.validate(valid => {

        if (valid) {
          const formData = normalizeFormValues(this.state.formData);
          this.props.onValid(formData);
        }
        else {
          this.props.onInvalid();
        }
      });
    },

    render() {
      var agreementTypesValues = [];
      const userAgreementTypes = this.props.agreementTypes;
      if (userAgreementTypes) {
        agreementTypesValues = formattingService.getValueLabelFromArray(userAgreementTypes);
      }

      const {fields: {name}, handleSubmit} = this.props;

      //
      //const formData = this.state.formData;
      //const status   = this.state.status;
      //
      //let executionDate = formData.executionDate;
      //if (executionDate) {
      //  executionDate = moment(executionDate);
      //}

      //todo remove me
      const executionDate = moment();

      const defaultFormClasses = ['form-group'];

      const nameInvalid     = name.touched && name.invalid;
      const nameFormClasses = cx(defaultFormClasses, {'has-error': nameInvalid});

      const counterpartyFormClasses = cx(defaultFormClasses);//, {'has-error': status.counterparty.errors});
      const executionDateFormClasses = cx(defaultFormClasses);//, {'has-error': status.executionDate.errors});
      const termLengthFormClasses = cx(defaultFormClasses);//, {'has-error': status.termLengthTimeAmount.errors});
      const outcomeNoticeFormClasses = cx(defaultFormClasses);//, {'has-error': status.outcomeNoticeTimeAmount.errors});

      const expirationAlertFormClasses = cx(defaultFormClasses);//, {'has-error': status.expirationAlertTimeAmount.errors});
      const outcomeNoticeAlertFormClasses = cx(defaultFormClasses);//, {'has-error': status.outcomeNoticeAlertTimeAmount.errors});

      return (
        <div className="agreement-edit-form-wrapper">
          <form className="form-horizontal" onSubmit={this.onSubmit}>
            <section className="row content-section-item space-bottom-xl">
              <div className="space-top-sm col-md-24">
                <h3 className="content-section-header">General Agreement Information</h3>

                <div className={nameFormClasses}>
                  <label htmlFor="agreement-form-name" className="col-sm-6 control-label">Agreement Name *</label>

                  <div className="col-sm-18">
                    <input autoFocus type="text" className="form-control" id="agreement-form-name" {...name}/>
                    {nameInvalid && <div className="help-block">{name.error}</div>}
                  </div>
                </div>

                <div className={counterpartyFormClasses}>
                  <label htmlFor="agreement-form-counterparty" className="col-sm-6 control-label">Counterparty
                    *</label>

                  <div className="col-sm-18">
                    <input type="text" className="form-control" id="agreement-form-counterparty"/>
                  </div>
                </div>

                <div className="form-group">
                  <label className="col-sm-6 control-label">Agreement Type</label>

                  <div className="col-sm-18">
                    <Select placeholder={null} options={agreementTypesValues}
                            allowCreate
                            value={undefined}
                            onChange={this.onChangeAgreementType}/>
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
            <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
              <div className="col-md-24">
                <h3 className="content-section-header">Agreement Duration and Renewal Information</h3>

                <div className={executionDateFormClasses}>
                  <label htmlFor="agreement-form-execution-date" className="col-sm-6 control-label">Execution
                    Date *</label>

                  <div className="col-sm-6">
                    <Datepicker className='form-control' selected={executionDate}
                                onChange={this.onChangeExecutionDate}/>
                  </div>
                  <div className="row">
                    <div className="col-sm-offset-6 col-sm-18">
                    </div>
                  </div>
                </div>

                <div className={termLengthFormClasses}>
                  <label htmlFor="agreement-form-d-length-amount" className="col-sm-6 control-label">Initial
                    Term
                    Length</label>

                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="agreement-form-term-length-amount"/>
                  </div>
                  <div className="col-sm-6">
                    <ButtonSelect items={timeTypes} value='day'
                                  onChange={this.onChangeTermLengthTimeType}
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                  </div>
                  <div className="row">
                    <div className="col-sm-offset-6 col-sm-18">
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-6 control-label">Auto-Renew?</label>

                  <div className="col-sm-6">
                    <ButtonSelect items={renewTypes} value={false}
                                  onChange={this.onChangeAutoRenew}
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                  </div>
                </div>
                <div className={outcomeNoticeFormClasses}>
                  <label htmlFor="agreement-form-outcome-notice-time-amount" className="col-sm-6 control-label">Outcome
                    Notice</label>

                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="agreement-form-outcome-notice-time-amount"/>
                  </div>
                  <div className="col-sm-9">
                    <ButtonSelect items={timeTypes} value='day'
                                  onChange={this.onChangeOutcomeNoticeTimeType}
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                        <span
                          className="control-label content-section-item space-left-sm space-right-sm agreement-form-control-text">before
                        </span>
                    <ButtonSelect items={[{label:"Expiration",value:'expiration'}]} value='expiration'
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                  </div>
                  <div className="col-sm-6">
                      <span className="help-text">
                        <i className='fa fa-info-circle space-right-md'/>
                        This is the date by which you need to give notice to the other side about your intent to renew or cancel the contract.
                      </span>
                  </div>
                  <div className="row">
                    <div className="col-sm-offset-6 col-sm-18">
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="agreement-form-durations-details" className="col-sm-6 control-label">Other
                    Details</label>

                  <div className="col-sm-11">
                    <textarea rows="5" className="form-control" id="agreement-form-durations-details"/>
                  </div>
                </div>

              </div>
            </section>
            <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
              <div className="col-md-24">
                <h3 className="content-section-header">Agreement Alerts</h3>

                <div className={expirationAlertFormClasses}>
                  <div className="col-sm-offset-2 col-sm-2 control-label">

                    <input id='agreement-form-expiration-notice-enabled' type="checkbox"
                           onChange={this.onChangeExpirationAlertEnabled}
                           checked={false}/>

                  </div>
                  <div className="col-sm-11">
                    <label htmlFor="agreement-form-expiration-notice-enabled" className="description-label">
                      <div>
                        Expiration Alert
                      </div>
                      <div className='description'>
                        Receive an alert prior to the contract expiring.
                      </div>
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="agreement-form-expiration-alert"/>
                  </div>
                  <div className="col-sm-4">
                    <ButtonSelect items={timeTypes} value='day'
                                  onChange={this.onChangeExpirationAlertTimeType}
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                  </div>
                  <div className="row">
                    <div className="col-sm-offset-4 col-sm-12">
                    </div>
                  </div>
                </div>

                <div className={outcomeNoticeAlertFormClasses}>
                  <div className="col-sm-offset-2 col-sm-2 control-label">

                    <input id='agreement-form-outcome-notice-alert-enabled' type="checkbox"
                           onChange={this.onChangeOutcomeNoticeAlertEnabled}
                           checked={false}/>

                  </div>
                  <div className="col-sm-11">
                    <label htmlFor="agreement-form-outcome-notice-alert-enabled" className="description-label">
                      <div>
                        Outcome Notice Alert
                      </div>
                      <div className='description'>
                        Receive an alert prior to the outcome notice date.
                      </div>
                    </label>
                  </div>
                  <div className="col-sm-3">
                    <input type="text" className="form-control" id="agreement-form-outcome-notice-alert"/>
                  </div>
                  <div className="col-sm-4">
                    <ButtonSelect items={timeTypes} value='day'
                                  onChange={this.onChangeOutcomeNoticeAlertTimeType}
                                  className="btn btn-sm btn-info agreement-form-button agreement-form-field-button"/>
                  </div>
                  <div className="row">
                    <div className="col-sm-offset-4 col-sm-12">
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="row agreement-form-section agreement-form-section-save content-section-item">
              <div className="col-md-24">
                <button type='submit' className="btn btn-primary">Save and Close
                </button>
              </div>
            </section>
          </form>
        </div>
      );
    }
  });


  component = reduxForm({
    form: 'agreementEditForm',
    fields: ['name'],
    validate
  })(component);

  return new DependencyProvider(component);
};
