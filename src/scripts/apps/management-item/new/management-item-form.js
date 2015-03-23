'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

import Actions from 'src/aggregates/management-item/actions';

const {Link} = Router;

export default function () {

  const component = React.createClass({
    render() {
      return (
          <div id="new-mi-wrapper">
            <h1 className="page-header">New Contract</h1>
            <section className="row mi-form-section">
              <div className="col-md-12">
                <h3>General Contract Information</h3>

                <form className="form-horizontal mi-form-data-entry">
                  <div className="form-group">
                    <label htmlFor="mi-form-contract-name" className="col-sm-2 control-label">Contract Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="mi-form-contract-name"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mi-form-counterparty" className="col-sm-2 control-label">Counterparty</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="mi-form-counterparty"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mi-form-description" className="col-sm-2 control-label">Brief Description</label>
                    <div className="col-sm-10">
                      <textarea rows="5" className="form-control" id="mi-form-description"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mi-form-contract-type" className="col-sm-2 control-label">Contract Type</label>
                    <div className="col-sm-10">
                      <div className="dropdown-wrapper">
                        <button className="form-control dropdown-toggle" type="button" id="mi-form-contract-type" data-toggle="dropdown" aria-expanded="true">
                          <span>
                            Dropdown
                            <i className="fa fa-caret-down"></i>
                          </span>
                        </button>
                        <ul className="dropdown-menu" role="menu" aria-labelledby="mi-form-contract-type">
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
                  <div className="form-group">
                    <div className="col-sm-2">
                      <button className="btn btn-xs btn-info mi-form-button mi-form-advanced-field-button">Advanced Fields
                        <i className="fa fa-caret-down"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

            </section>
            <section className="row mi-form-section">
              <div className="col-md-12">
                <h3>Contract Duration and Renewal Information</h3>

                <form className="form-horizontal mi-form-data-entry">
                  <div className="form-group">
                    <label htmlFor="mi-form-contract-term-length" className="col-sm-2 control-label">Initial Term Length</label>
                    <div className="col-sm-1">
                      <input type="text" className="form-control" id="mi-form-contract-term-length"/>
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-sm btn-info mi-form-button mi-form-field-button">Days
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-2">
                      <button className="btn btn-xs btn-info mi-form-button mi-form-advanced-field-button">Advanced Fields
                        <i className="fa fa-caret-down"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="row mi-form-section">
              <div className="col-md-12">
                <h3>Financial Details</h3>

                <form className="form-horizontal mi-form-data-entry">
                  <div className="form-group">
                    <label htmlFor="mi-form-contract-term-length" className="col-sm-2 control-label">Cash Flow</label>
                    <div className="col-sm-3">
                      <div className="btn-group" role="group" aria-label="...">
                        <button className="btn btn-sm btn-info mi-form-button active mi-form-field-button">In</button>
                        <button className="btn btn-sm btn-info mi-form-button mi-form-field-button">Out</button>
                        <button className="btn btn-sm btn-info mi-form-button mi-form-field-button">None</button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-2">
                      <button className="btn btn-xs btn-info mi-form-button mi-form-advanced-field-button">Advanced Fields
                        <i className="fa fa-caret-down"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="row mi-form-section">
              <div className="col-md-12">
                <h3>Contract Alerts</h3>

                <form className="form-horizontal mi-form-data-entry">
                  <div className="form-group">
                    <div className="col-sm-2">
                      <button className="btn btn-xs btn-info mi-form-button mi-form-action-button">Add New Alert
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="row mi-form-section">
              <div className="col-md-12">
                <h3>Advanced Contract Categories</h3>

                <form className="form-horizontal mi-form-data-entry">
                  <div className="form-group">
                    <div className="col-sm-2">
                      <button className="btn btn-xs btn-info mi-form-button mi-form-expand-button">Categories
                        <i className="fa fa-caret-down"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
            <section className="row mi-form-section mi-form-section-save">
              <div className="col-md-12">
                <button className="btn btn-default">Save
                </button>
                <button className="btn btn-primary">Save and Close
                </button>
              </div>
            </section>
          </div>
      );
    }
  });

  return new ComponentProvider(component);
};
