'use strict';

import React from 'react';
import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';

//import TextSearchField from './advanced-text-search-field';
//import SelectSearchField from './advanced-select-search-field';

//import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {

  const component = React.createClass({
    displayName: "AdvancedSearchQueryContainerComponent",

    //contextTypes: { todo look at me
    //  router: React.PropTypes.func
    //},

    doSearch() {
      this.props.onSearch();
    },

    render() {
      return null;
      let agreementTypesValues = [];
      const userAgreementTypes = this.props.agreementTypes;
      if (userAgreementTypes) {
        agreementTypesValues = formattingService.getValueLabelFromArray(userAgreementTypes);
      }

      let counterpartiesValues  = [];
      const counterpartiesTypes = this.props.counterparties;
      if (counterpartiesTypes.length) {
        counterpartiesValues = formattingService.getValueLabelFromArray(counterpartiesTypes);
      }

      let counterpartyValue = this.props.parameters.counterparty;
      if (counterpartyValue && counterpartiesValues) {
        // counterparty doesn't have an ID yet - it's just a string.
        counterpartyValue = counterpartiesValues.find(item=>item.label === counterpartyValue).value;
      }

      return (
        <div className="advanced-search-query-container">

          <div className="popover advanced-search-popover">
            <div className="popover-title">Find Agreements</div>

            <div className="popover-content">

              <ul className="advanced-search-list">
                <li><TextSearchField iconClass="fa-search" fieldLabel="Contains the words"
                                     value={this.props.parameters.text}
                                     onChange={this.props.onTextChanged}/>
                </li>
                <li><SelectSearchField iconClass="fa-building" fieldLabel="Counterparty"
                                       options={counterpartiesValues}
                                       value={counterpartyValue}
                                       onChange={this.props.onCounterpartyChanged}/></li>
                <li><SelectSearchField iconClass="fa-file" fieldLabel="Type of agreement"
                                       options={agreementTypesValues}
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
