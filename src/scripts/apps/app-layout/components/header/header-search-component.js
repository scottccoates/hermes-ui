'use strict';

import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {BaconMixin} from 'react-bacon';

import DisplayContainer from '../../../../libs/react-js/components/display-container';
import FocusContainer from '../../../../libs/react-js/components/focus-container';

import formattingService from 'src/scripts/apps/formatting/services/formatting-service';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (searchQueryInputBoxComponent, searchQueryListComponent, advancedSearchQueryContainerComponent, searchActions, searchService) {
  const SearchQueryInputBox          = searchQueryInputBoxComponent.dependency;
  const SearchQueryList              = searchQueryListComponent.dependency;
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
          query: ''
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
      this.props.searchActions.resetAdvancedSearchParameters();
      this.setState({advancedSearchDropdownEnabled: false});
    },

    onAdvancedSearchClick() {
      this.setState({searchDropdownEnabled: false, advancedSearchDropdownEnabled: true});

      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {text: this.state.simple.query});
      this.props.searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onItemSelected(){
      this.refs.input.clear();
      this.onSearchClose();
      const resultVal = Object.assign({}, this.state.simple, {count: 0, results: [], query: ''});
      this.setState({simple: resultVal});
    },

    onTextChanged(text){
      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {text});
      this.props.searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onAgreementTypeChanged(agreementType){
      let typeId = null;

      if (agreementType) {
        typeId = agreementType.value;
      }

      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {typeId});
      this.props.searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onCounterpartyChanged(counterpartyOption){
      let counterparty = null;

      if (counterpartyOption) {
        counterparty = counterpartyOption.value;
      }

      const parameters = Object.assign({}, this.props.advancedSearch.parameters, {counterparty});
      this.props.searchActions.specifyAdvancedSearchParameters(parameters);
    },

    onAdvancedSearch(){
      this.onAdvancedSearchClose();
      searchService.transitionToAdvancedSearchPage(this.props.advancedSearch.parameters);
    },

    componentWillMount() {
      const onInputClickStream = this.eventStream('onInputClick');
      onInputClickStream
        .filter(() => !this.state.searchDropdownEnabled)
        .subscribe(()=>this.setState({searchDropdownEnabled: true}));
    },

    render() {
      var agreementTypesValues = [];
      const userAgreementTypes = this.props.userAgreementTypes.agreementTypes;
      if (userAgreementTypes) {
        agreementTypesValues = formattingService.getValueLabelFromArray(userAgreementTypes);
      }

      var counterpartiesValues  = [];
      const counterpartiesTypes = this.props.userCounterparties.counterparties;
      if (counterpartiesTypes.length) {
        counterpartiesValues = formattingService.getValueLabelFromArray(counterpartiesTypes);
      }
      return (
        <div className="header-search">

        <span>
            <i className="fa fa-search search-icon"></i>
            <SearchQueryInputBox ref='input' onClick={this.onInputClick} onLoading={this.onLoading}
                                 onResultsReceived={this.searchResultsReceived}/>
        </span>


          <FocusContainer enableOnClickOutside={this.state.searchDropdownEnabled}
                          handleClickOutside={this.onSearchClose}>
            <DisplayContainer open={this.state.searchDropdownEnabled}>

              <div className="popover search-popover">
                <div className="popover-content">
                  <SearchQueryList count={this.state.simple.count}
                                   results={this.state.simple.results} loading={this.state.simple.loading}
                                   query={this.state.simple.query} onItemSelected={this.onItemSelected}
                                   onAdvancedSearchClick={this.onAdvancedSearchClick}/>
                </div>
              </div>

            </DisplayContainer>
          </FocusContainer>

          <FocusContainer enableOnClickOutside={this.state.advancedSearchDropdownEnabled}
                          handleClickOutside={this.onAdvancedSearchClose}>
            <DisplayContainer open={this.state.advancedSearchDropdownEnabled}>
              <AdvancedSearchQueryContainer parameters={this.props.advancedSearch.parameters}
                                            onTextChanged={this.onTextChanged}
                                            counterparties={counterpartiesValues}
                                            onCounterpartyChanged={this.onCounterpartyChanged}
                                            agreementTypes={agreementTypesValues}
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
      userAgreementTypes: s.userAgreementTypes,
      userCounterparties: s.userCounterparties
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      searchActions: bindActionCreators(searchActions, dispatch)
    };
  }

  headerSearch = connect(select, mapDispatchToProps)(headerSearch);

  return new DependencyProvider(headerSearch);
}
