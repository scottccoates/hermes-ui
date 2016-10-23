'use strict';

import React from 'react';

import { connect } from 'react-redux';

import {BaconMixin} from 'react-bacon';

import DisplayContainer from '../../../../libs/react-js/components/display-container';
import FocusContainer from '../../../../libs/react-js/components/focus-container';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (searchActions, searchService, smartViewActions, simpleSearchQueryInputBoxComponent, simpleSearchQueryListComponent, advancedSearchQueryContainerComponent) {
  const SimpleSearchQueryInputBox    = simpleSearchQueryInputBoxComponent.dependency;
  const SimpleSearchQueryList        = simpleSearchQueryListComponent.dependency;
  const AdvancedSearchQueryContainer = advancedSearchQueryContainerComponent.dependency;

  let headerSearch = React.createClass({
    displayName: "HeaderSearchComponent",
    mixins: [BaconMixin],

    getInitialState() {
      return {
        simple: {
          count: 0,
          results: [],
          loading: false,
          query: null
        },
        searchDropdownEnabled: false,
        advancedSearchDropdownEnabled: false
      };
    },

    onLoading(loading){
      const loadingVal = Object.assign({}, this.state.simple, {loading});
      this.setState({simple: loadingVal});
    },

    searchResultsReceived(resultSet){
      const {count,results,query} = resultSet;
      const resultVal = Object.assign({}, this.state.simple, {count, results, query});

      this.setState({simple: resultVal});
    },

    onSearchClose() {
      this.setState({searchDropdownEnabled: false});
    },

    onAdvancedSearchClose() {
      searchActions.resetAdvancedSearchParameters();
      this.setState({advancedSearchDropdownEnabled: false});
    },

    onAdvancedSearchClick() {
      this.setState({searchDropdownEnabled: false, advancedSearchDropdownEnabled: true});

      const query = this.state.simple.query;
      if (query) {
        const parameters = Object.assign({}, this.props.advancedSearch.parameters, {text: query});
        searchActions.specifyAdvancedSearchParameters(parameters);
      }
    },

    onMoreClick() {
      this.setState({searchDropdownEnabled: false});
      const query      = this.state.simple.query;
      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {text: query});
      smartViewActions.clearSmartViewEdit();
      searchActions.specifyAdvancedSearchParameters(parameters);
      searchService.transitionToAdvancedSearchPage(parameters);
    },

    onItemSelected(){
      this.refs.input.clear();
      this.onSearchClose();
      const resultVal = Object.assign({}, this.state.simple, {count: 0, results: [], query: null});
      this.setState({simple: resultVal});
    },

    onTextChanged(text){
      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {text});
      searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onAgreementTypeChanged(agreementType){
      let typeId = null;

      if (agreementType) {
        typeId = agreementType;
      }

      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {typeId});
      searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onCounterpartyChanged(newVal, counterpartyOption){
      let counterparty = null;

      if (counterpartyOption.length) {
        // counterparties don't have ID's yet - they're just strings.
        counterparty = counterpartyOption[0].label;
      }

      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {counterparty});
      searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onAdvancedSearch(){
      this.setState({advancedSearchDropdownEnabled: false});
      smartViewActions.clearSmartViewEdit();
      searchService.transitionToAdvancedSearchPage(this.props.advancedSearch.parameters);
    },

    componentWillMount() {
      const onInputClickStream = this.eventStream('onInputClick');
      onInputClickStream
        .filter(() => !this.state.searchDropdownEnabled)
        .subscribe(()=>this.setState({searchDropdownEnabled: true}));
    },

    render() {
      return (
        <div className="header-search">

        <span>
            <i className="fa fa-search search-icon" />
            <SimpleSearchQueryInputBox ref="input" onClick={this.onInputClick} onLoading={this.onLoading}
                                       onResultsReceived={this.searchResultsReceived}/>
        </span>


          <FocusContainer disableOnClickOutside={!this.state.searchDropdownEnabled}
                          handleClickOutside={this.onSearchClose}>
            <DisplayContainer open={this.state.searchDropdownEnabled}>

              <div className="popover search-popover">
                <div className="popover-content">
                  <SimpleSearchQueryList count={this.state.simple.count}
                                         results={this.state.simple.results} loading={this.state.simple.loading}
                                         query={this.state.simple.query} onItemSelected={this.onItemSelected}
                                         onAdvancedSearchClick={this.onAdvancedSearchClick}
                                         onMoreClick={this.onMoreClick}/>
                </div>
              </div>

            </DisplayContainer>
          </FocusContainer>

          <FocusContainer disableOnClickOutside={!this.state.advancedSearchDropdownEnabled}
                          handleClickOutside={this.onAdvancedSearchClose}>
            <DisplayContainer open={this.state.advancedSearchDropdownEnabled}>
              <AdvancedSearchQueryContainer parameters={this.props.advancedSearch.parameters}
                                            onTextChanged={this.onTextChanged}
                                            counterparties={this.props.userCounterparties.counterparties}
                                            onCounterpartyChanged={this.onCounterpartyChanged}
                                            agreementTypes={this.props.userAgreementTypes.agreementTypes}
                                            onAgreementTypeChanged={this.onAgreementTypeChanged}
                                            onSearch={this.onAdvancedSearch}/>
            </DisplayContainer>

          </FocusContainer>

        </div>
      );
    }
  });

  function select(s) {
    return {
      advancedSearch: s.advancedSearch,
      userAgreementTypes: s.userAgreementTypes || {agreementTypes: []/* todo remove me */},
      userCounterparties: s.userCounterparties || {counterparties: []/* todo remove me */},
    };
  }

  headerSearch = connect(select)(headerSearch);

  return new DependencyProvider(headerSearch);
}
