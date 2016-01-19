'use strict';

import React from 'react';
import Router  from 'react-router';

import { connect } from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function (searchResultListProvider) {

  const SearchResultList = searchResultListProvider.dependency;

  var component = React.createClass({
    displayName: "SearchResultsContainerComponent",

    render() {
      return (
        <div id="search-result-container-wrapper">
          <div className="content-section alt-content-section search-header-section space-bottom-sm space-top-sm">
            <div className="container">
              <p className='search-header-text'>
                Agreements containing licensee within the same sentence as terminate
              </p>
            </div>
          </div>

          <div className="content-section  space-bottom">
            <div className="container">
              <SearchResultList/>
            </div>
          </div>
        </div>
      );
    }
  });


  function extracted(state) {
    return {
      agreementEdit: state.agreementEdit,
      userAgreementTypes: state.userAgreementTypes
    };
  }

  component = connect(extracted)(component);

  return new DependencyProvider(component);
};
