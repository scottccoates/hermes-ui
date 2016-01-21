'use strict';

import React from 'react';
import Router  from 'react-router';

import {BaconMixin} from 'react-bacon';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler, History} = Router;

export default function (searchActions, agreementListComponent) {

  const AgreementList = agreementListComponent.dependency;

  var component = React.createClass({
    displayName: "SearchResultsContainerComponent",
    mixins: [BaconMixin],

    componentWillMount(){
      const queryStringStream = this.propsProperty('location')
        .map('.search')
        .skipDuplicates()
        .subscribe(async _=> await this.performedAdvancedSearch());
    },

    componentWillUnmount(){
      searchActions.resetAdvancedSearchParameters();
    },

    async performedAdvancedSearch(){
      const parameters = this.props.location.query;
      searchActions.specifyAdvancedSearchParameters(parameters); //keep the advanced search box in sync w/ current search params
      await searchActions.performAdvancedSearch(parameters);
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

      return (
        <div id="search-result-container-wrapper">
          <div className="content-section  space-top space-bottom">
            <div className="container">
              <h1 className="page-header">
                <span>Agreements Search</span>

                <button type='button' className='btn btn-sm btn-info smart-view-action'>
                  <i className='fa fa-star'></i>
                </button>

              </h1>
            </div>
          </div>

          <div className="content-section space-bottom">
            <div className="container">
              {agreementListContent}
            </div>
          </div>
        </div>
      );
    }
  });


  function extracted(state) {
    return {
      advancedSearch: state.advancedSearch
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
