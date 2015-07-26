'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import Agreement from '../../models/agreement-list-item';

import Select from 'react-select';
import Validation from 'rc-form-validation';

const {Link} = Router;

const {Validator} = Validation;

export default function (agreementActions) {

  const component = React.createClass({
    displayName: "NewAgreementForm",
    mixins: [Validation.FieldMixin],

    getInitialState() {
      return {
        status: {
          name: {}
        },
        formData: {
          name: 'heya'
        }
      };
    },

    getDefaultProps(){
      return {
        onValidate: ()=> {
        }
      }
    },

    onSubmit(event){
      event.preventDefault();
      var validation = this.refs.validation;

      // it's important to remember that validation is async (consider database calls, apis, existence in db, etc).
      validation.validate(valid => {
        this.props.onValidate(valid);
        agreementActions.addToCollection(this.state.formData);
      });
    },

    render() {

      const formData = this.state.formData;
      const status   = this.state.status;

      function logChange(val) {
        console.log("Selected:", val, arguments);
      }

      var SelectedValuesField = React.createClass({

        onLabelClick: function (data, event) {
          console.log(data, event);
        },

        render: function () {
          var ops = [
            {label: 'Chocolate', value: 'chocolate'},
            {label: 'Vanilla', value: 'vanilla'},
            {label: 'Strawberry', value: 'strawberry'},
            {label: 'Caramel', value: 'caramel'},
            {label: 'Cookies and Cream', value: 'cookiescream'},
            {label: 'Peppermint', value: 'peppermint'}
          ];
          return (
            <Select
              onOptionLabelClick={this.onLabelClick}
              value="chocolate,vanilla,strawberry"
              multi={true}
              placeholder="Select your favourite(s)"
              options={ops}
              onChange={logChange}/>
          );
        }
      });
      return (
        <div id="new-agreement-wrapper">
          <div id="agreement-form-wrapper">

            <div className="content-section default-content-section space-top space-bottom">
              <div className="container">
                <h1 className="page-header">New Contract</h1>
              </div>
            </div>

            <div className="content-section default-content-section space-bottom">
              <div className="container">
                <form className="form-horizontal agreement-form-data-entry" onSubmit={this.onSubmit}>
                  <Validation ref='validation' onValidate={this.handleValidate}>
                    <section className="row agreement-form-section content-section-item space-bottom-xl">
                      <div className="space-top-sm col-md-24">
                        <h3 className="content-section-header">General Contract Information</h3>


                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-name" className="col-sm-6 control-label">Contract
                            Name</label>

                          <div className="col-sm-18">
                            <Validator rules={{required:true, message: 'WTF'}} value={formData.name}>
                              <input type="text" name="name" className="form-control" id="agreement-form-contract-name"
                                     value={formData.name}/>
                            </Validator>
                            {status.name.errors ? <span> {status.name.errors.join(', ')}</span> : null}
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-counterparty"
                                 className="col-sm-6 control-label">Counterparty</label>

                          <div className="col-sm-18">
                            <input type="text" className="form-control" id="agreement-form-counterparty"
                                   defaultValue="Microsoft"/>

                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-counterparty"
                                 className="col-sm-6 control-label">Counterparty</label>

                          <div className="col-sm-18">
                            <SelectedValuesField label="Clickable labels (labels as links):"/>
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-description" className="col-sm-6 control-label">Brief
                            Description</label>

                          <div className="col-sm-18">
                            <textarea rows="5" className="form-control" id="agreement-form-description"/>
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-type" className="col-sm-6 control-label">Contract
                            Type</label>

                          <div className="col-sm-18">
                            <div className="dropdown-wrapper">
                              <button type='button' className="form-control dropdown-toggle"
                                      id="agreement-form-contract-type"
                                      data-toggle="dropdown" aria-expanded="true">
                          <span>
                            Licensing Agreement
                            <i className="fa fa-caret-down space-left"></i>
                          </span>
                              </button>
                              <ul className="dropdown-menu" role="menu" aria-labelledby="agreement-form-contract-type">
                                <li role="presentation">
                                  <a role="menuitem" tabindex="-1" href="#">Action</a>
                                </li>
                                <li role="presentation">
                                  <a role="menuitem" tabindex="-1" href="#">Another action</a>
                                </li>
                                <li role="presentation">
                                  <a role="menuitem" tabindex="-1" href="#">Something else here</a>
                                </li>
                                <li role="presentation">
                                  <a role="menuitem" tabindex="-1" href="#">Separated link</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="form-group content-section-item space-top">
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-xs btn-info agreement-form-button agreement-form-advanced-field-button">
                              Advanced
                              Fields
                              <i className="fa fa-caret-down space-left"></i>
                            </button>
                          </div>
                        </div>

                      </div>

                    </section>
                    <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
                      <div className="col-md-24">
                        <h3 className="content-section-header">Contract Duration and Renewal Information</h3>


                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-term-length" className="col-sm-6 control-label">Initial
                            Term
                            Length</label>

                          <div className="col-sm-3">
                            <input type="text" className="form-control" id="agreement-form-contract-term-length"
                                   defaultValue="2"/>
                          </div>
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Years
                            </button>
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-term-length"
                                 className="col-sm-6 control-label">Auto-Renew?</label>

                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Yes
                            </button>
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-term-length" className="col-sm-6 control-label">Renewal
                            Notice</label>

                          <div className="col-sm-3">
                            <input type="text" className="form-control" id="agreement-form-contract-term-length"
                                   defaultValue="60"/>
                          </div>
                          <div className="col-sm-10">
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Days
                            </button>
                        <span
                          className="control-label content-section-item space-left-sm space-right-sm agreement-form-control-text">before
                        </span>
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Expiration
                            </button>
                          </div>

                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-description" className="col-sm-6 control-label">Other
                            Details</label>

                          <div className="col-sm-18">
                            <textarea rows="5" className="form-control" id="agreement-form-description"/>
                          </div>
                        </div>

                        <div className="form-group content-section-item space-top">
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-xs btn-info agreement-form-button agreement-form-advanced-field-button">
                              Advanced
                              Fields
                              <i className="fa fa-caret-down space-left"></i>
                            </button>
                          </div>
                        </div>

                      </div>
                    </section>
                    <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
                      <div className="col-md-24">
                        <h3 className="content-section-header">Financial Details</h3>


                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-term-length" className="col-sm-6 control-label">Cash
                            Flow</label>

                          <div className="col-sm-6">
                            <div className="btn-group" role="group" aria-label="...">
                              <button type='button'
                                      className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                                In
                              </button>
                              <button type='button'
                                      className="btn btn-sm btn-info active agreement-form-button agreement-form-field-button">
                                Out
                              </button>
                              <button type='button'
                                      className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                                None
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-description" className="col-sm-6 control-label">Other
                            Details</label>

                          <div className="col-sm-18">
                            <textarea rows="5" className="form-control" id="agreement-form-description"/>
                          </div>
                        </div>
                        <div className="form-group content-section-item space-top">
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-xs btn-info agreement-form-button agreement-form-advanced-field-button">
                              Advanced
                              Fields
                              <i className="fa fa-caret-down space-left"></i>
                            </button>
                          </div>
                        </div>

                      </div>
                    </section>
                    <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
                      <div className="col-md-24">
                        <h3 className="content-section-header">Contract Alerts</h3>


                        <div className="form-group content-section-item">
                          <label htmlFor="agreement-form-contract-term-length" className="col-sm-6 control-label">Notify
                            Me</label>

                          <div className="col-sm-3">
                            <input type="text" className="form-control" id="agreement-form-contract-term-length"
                                   defaultValue="30"/>
                          </div>
                          <div className="col-sm-10">
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Days
                            </button>
                        <span
                          className="control-label content-section-item space-left-sm space-right-sm agreement-form-control-text">before
                        </span>
                            <button type='button'
                                    className="btn btn-sm btn-info agreement-form-button agreement-form-field-button">
                              Renewal Notice
                            </button>
                          </div>

                        </div>
                        <div className="form-group content-section-item">
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-xs btn-info agreement-form-button agreement-form-action-button">
                              Add
                              New Alert
                            </button>
                          </div>
                        </div>

                      </div>
                    </section>
                    <section className="row agreement-form-section content-section-item space-top-sm space-bottom-xl">
                      <div className="col-md-24">
                        <h3 className="content-section-header">Advanced Contract Categories</h3>


                        <div className="form-group content-section-item">
                          <div className="col-sm-6">
                            <button type='button'
                                    className="btn btn-xs btn-info agreement-form-button agreement-form-expand-button">
                              Categories
                              <i className="fa fa-caret-down space-left"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                    <section className="row agreement-form-section agreement-form-section-save content-section-item">
                      <div className="col-md-24">
                        <button type='submit' className="btn btn-default">Save
                        </button>
                        <Link to="dashboard" className="btn btn-primary">Save and Close
                        </Link>
                      </div>
                    </section>
                  </Validation>
                </form>
              </div>
            </div>
          </div>
        </div>

      );
    }
  });

  return new DependencyProvider(component);
};
