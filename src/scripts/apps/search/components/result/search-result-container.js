'use strict';

import React from 'react';
import Router  from 'react-router';

import {Modal} from 'react-bootstrap';

import {BaconMixin} from 'react-bacon';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import _ from 'lodash';

const {Link, RouteHandler, History} = Router;

export default function (searchActions, smartViewActions, agreementListComponent, smartViewEditFormComponent) {

  const AgreementList = agreementListComponent.dependency;
  const SmartViewForm = smartViewEditFormComponent.dependency;

  var component = React.createClass({
    displayName: "SearchResultsContainerComponent",
    mixins: [BaconMixin],

    getInitialState() {
      return {
        smartViewModalEnabled: false
      };
    },

    componentWillMount(){
      const queryStringStream = this.propsProperty('location')
        .map('.search')
        .skipDuplicates()
        .subscribe(async _=> await this.performedAdvancedSearch());
    },

    componentWillUnmount(){
      searchActions.resetAdvancedSearchParameters();
    },

    onSmartViewModalClose(){
      this.setState({smartViewModalEnabled: false});
    },

    onSmartViewModalOpen(){
      this.setState({smartViewModalEnabled: true});
    },

    async performedAdvancedSearch(){
      const parameters = this.props.location.query;
      searchActions.specifyAdvancedSearchParameters(parameters); //keep the advanced search box in sync w/ current search params
      await searchActions.performAdvancedSearch(parameters);
    },

    onSaveSmartView(data){
      smartViewActions.saveSmartView(Object.assign({}, data, {
        query: this.props.advancedSearch.parameters
      }));
      this.onSmartViewModalClose();
    },

    onSmartViewCancel(){
      this.onSmartViewModalClose();
    },

    onSmartViewInvalid(){
    },

    onSmartFieldDelete(){
      smartViewActions.deleteSmartView();
    },

    render() {
      var agreementListContent = null;

      const count = this.props.advancedSearch.resultSet.count;
      if (count) {

        agreementListContent = (
          <div>
            <h3 className="content-section-header">{count} Agreements</h3>
            <AgreementList agreements={this.props.advancedSearch.resultSet.results}/>
          </div>
        );
      }
      else {
        agreementListContent = (
          <div>
            <h3 className="content-section-header ">
              Sorry, no agreements found.
            </h3>
          </div>
        );
      }


      let searchResultsHeaderText;

      let smartViewHeaderButton;
      let smartViewHeaderText;
      let smartViewHeaderIcon;

      const smartView                     = this.props.smartViewEdit.smartView;
      const advancedSearchParametersExist = _.some(this.props.advancedSearch.parameters);

      if (smartView) {
        smartViewHeaderText     = 'Edit Smart View';
        smartViewHeaderIcon     = 'fa fa-pencil';
        searchResultsHeaderText = smartView.name;
      }
      else {
        if (advancedSearchParametersExist) {
          smartViewHeaderText     = 'Create Smart View';
          smartViewHeaderIcon     = 'fa fa-star';
          searchResultsHeaderText = 'Search Results';
        }
        else {
          searchResultsHeaderText = 'All Results';
        }
      }

      if (advancedSearchParametersExist) {
        smartViewHeaderButton = (
          <button type='button' className='btn btn-sm btn-info smart-view-action'
                  onClick={this.onSmartViewModalOpen}>
            <i className={smartViewHeaderIcon}></i>
          </button>
        );
      }

      return (
        <div id="search-result-container-wrapper">
          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">
                <span>{searchResultsHeaderText}</span>
                {smartViewHeaderButton}
              </h1>
            </div>
          </div>

          <div className="content-section space-bottom">
            <div className="container">
              {agreementListContent}
            </div>
          </div>

          <Modal show={this.state.smartViewModalEnabled} onHide={this.onSmartViewModalClose}>
            <div className="content-section space-top space-bottom">
              <div className="container-fluid">
                <h1 className="page-header">{smartViewHeaderText}</h1>
              </div>
            </div>

            <div className="content-section space-bottom-sm">
              <div className="container-fluid">
                <SmartViewForm onValid={this.onSaveSmartView}
                               onCancel={this.onSmartViewCancel}
                               onInvalid={this.onSmartViewInvalid}
                               onDelete={this.onSmartFieldDelete}
                               smartView={smartView}/>
              </div>
            </div>

          </Modal>

        </div>
      );
    }
  });


  function extracted(state) {
    return {
      advancedSearch: state.advancedSearch,
      smartViewEdit: state.smartViewEdit
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
