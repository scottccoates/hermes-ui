'use strict';

import React from 'react';
import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';
import ReactBootstrap from 'react-bootstrap';

import TextSearchField from './advanced-text-search-field';
import SelectSearchField from './advanced-select-search-field';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  const component = React.createClass({
    displayName: "AdvancedSearchQueryContainerComponent",

    contextTypes: {
      router: React.PropTypes.func
    },

    doSearch() {
      this.props.onSearch();
    },

    render() {
      return (
        <div className="advanced-search-query-container">

          <div className="popover advanced-search-popover">
            <div className="popover-title">Find Agreements</div>

            <div className="popover-content">

              <ul className="advanced-search-list">
                <li><TextSearchField iconClass='fa-search' fieldLabel="Contains the words"
                                     value={this.props.parameters.text}
                                     onChange={this.props.onTextChanged}/>
                </li>
                <li><SelectSearchField iconClass='fa-building' fieldLabel="Counterparty"
                                       options={this.props.counterparties}
                                       value={this.props.parameters.counterparty}
                                       onChange={this.props.onCounterpartyChanged}/></li>
                <li><SelectSearchField iconClass='fa-file' fieldLabel="Type of agreement"
                                       options={this.props.agreementTypes}
                                       value={this.props.parameters.typeId}
                                       onChange={this.props.onAgreementTypeChanged}/></li>
              </ul>

              <div className="advanced-search-button">
                <button className="btn btn-sm btn-primary" onClick={this.doSearch}>Search</button>
              </div>
            </div>

          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
}
