'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/react-js/components/component-provider';

const {Link, RouteHandler} = Router;

export default function (SearchResultItemProvider) {

  const SearchResultItem = SearchResultItemProvider.componentType;

  const component = React.createClass({
    render() {
      return (
        <div id="search-result-wrapper">
          <div className="alt-section search-header-section">
            <div className="container">
              <p className='search-header-text'>
                Contracts containing confidential within the same sentence as disclosure and notifications due within 90
                days
              </p>
            </div>
          </div>

          <div className="section search-results-section">
            <div className="container">

              <div className='section'>
                <div className='search-results-count'>
                  17 Results Found
                </div>

                <div className="search-adjust">
                  <button className="btn btn-info btn-sm sort-search-button" type="button">
                    <span>Sort By: Date Created</span>
                    <i className="fa fa-chevron-down"></i>
                  </button>
                  <button className="btn btn-info btn-sm refine-search-button" type="button">
                    <i className="fa fa-wrench"></i>
                    <span>Refine Search</span>
                  </button>
                </div>
              </div>

              <div className='section'>
                <div className="search-results">

                  <SearchResultItem />

                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }
  });

  return new ComponentProvider(component);
};
