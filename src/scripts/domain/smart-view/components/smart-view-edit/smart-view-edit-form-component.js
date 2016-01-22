'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Select from 'react-select';
import Validation from 'rc-form-validation';

import cx from 'classnames';

import {normalizeFormValues} from 'src/scripts/libs/js-utils/form/form-utils';

const {Validator} = Validation;

export default function () {

  const component = React.createClass({
    displayName: "SmartViewEditFormComponent",
    mixins: [Validation.FieldMixin],

    getInitialState() {
      return {
        status: {
          name: {}
        },
        formData: {
          name: ''
        }
      };
    },

    componentWillMount () {
      // populate data from parent
      // currently the smart view is being passed in as a simple object - we're not re-retrieving it from firebase
      // like how we're doing w/ agreement edits
      this._setFormData(Object.assign({}, this.getInitialState().formData, this.props.smartView));
    },

    _setFormData(val){
      this.setState({formData: Object.assign({}, this.state.formData, val)});
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
      const formData = this.state.formData;
      const status   = this.state.status;

      const defaultFormClasses = ['form-group'];
      const nameFormClasses    = cx(defaultFormClasses, {'has-error': status.name.errors});

      let deleteButton;
      if (this.props.smartView) {
        deleteButton = (
          <button type='button' className="btn btn-danger" onClick={this.props.onDelete}>Delete
          </button>
        );
      }
      return (
        <div className="smart-view-edit-form-wrapper">
          <form className="form-horizontal" onSubmit={this.onSubmit}>
            <Validation ref='validation' onValidate={this.handleValidate}>
              <section className="row content-section-item space-bottom-xl">
                <div className="space-top-sm col-md-24">
                  <div className={nameFormClasses}>
                    <label htmlFor="agreement-form-name" className="col-sm-6 control-label">Name</label>

                    <div className="col-sm-18">
                      <Validator rules={{required:true, message: 'Name is required'}}>
                        <input autoFocus type="text" name="name" className="form-control"
                               id="agreement-form-name"
                               value={formData.name}/>
                      </Validator>
                      {status.name.errors ?
                        <div className="help-block">{status.name.errors.join(', ')}</div> : null}
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
            </Validation>
          </form>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
