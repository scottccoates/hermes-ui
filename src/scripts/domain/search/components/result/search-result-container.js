'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function (searchResultListProvider) {

  const SearchResultList = searchResultListProvider.dependency;

  const component = React.createClass({
    displayName: "SearchResultsContainer",

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

  return new DependencyProvider(component);
};
