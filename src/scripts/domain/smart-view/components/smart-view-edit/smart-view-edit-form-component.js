'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Select from 'react-select';
//todo remove rc form
import {reduxForm} from 'redux-form';

import cx from 'classnames';
//todo test unctonroled smart view name
import {required, integer} from 'src/scripts/libs/js-utils/validation/validation-utils';

import {normalizeFormValues} from 'src/scripts/libs/js-utils/form/form-utils';

function validate(values) {
  const errors = {};

  errors.name = required(values.name, 'Name is required');

  return errors;
}

export default function () {

  let component = React.createClass({
    displayName: "SmartViewEditFormComponent",

    onSubmit(values){
      const newValues = normalizeFormValues(values);
      this.props.onValid(newValues);
    },

    render() {
      const {fields: {name},handleSubmit} = this.props;

      const defaultFormClasses = ['form-group'];
      const nameInvalid        = name.touched && name.invalid;
      const nameFormClasses    = cx(defaultFormClasses, {'has-error': nameInvalid});


      let deleteButton;
      if (this.props.smartView) {
        deleteButton = (
          <button type='button' className="btn btn-danger" onClick={this.props.onDelete}>Delete
          </button>
        );
      }

      const submit = event => {
        // requires this setting below returnRejectedSubmitPromise: true
        // https://github.com/erikras/redux-form/issues/256
        const submitPromise = handleSubmit(this.onSubmit)(event);
        if (submitPromise) {
          submitPromise.catch(err => this.props.onInvalid(err));
        }
      };

      return (
        <div className="smart-view-edit-form-wrapper">
          <form className="form-horizontal" onSubmit={submit}>
            <section className="row content-section-item space-bottom-xl">
              <div className="space-top-sm col-md-24">
                <div className={nameFormClasses}>
                  <label htmlFor="agreement-form-name" className="col-sm-6 control-label">Name</label>

                  <div className="col-sm-18">
                    <input autoFocus type="text" className="form-control" id="agreement-form-name" {...name}/>
                    {nameInvalid && <div className="help-block">{name.error}</div>}
                  </div>
                </div>
              </div>

            </section>

            <section className="row agreement-form-section agreement-form-section-save content-section-item">
              <div className="col-md-24">
                <button type='submit' className="btn btn-primary pull-right content-section-item space-left-md">Save
                </button>
                <button type='button' className="btn btn-info pull-right" onClick={this.props.onCancel}>Cancel
                </button>
                {deleteButton}
              </div>
            </section>
          </form>
        </div>
      );
    }
  });

  component = reduxForm({
    fields: ['name'],
    validate,
    returnRejectedSubmitPromise: true
  })(component);
  return new DependencyProvider(component);
};
