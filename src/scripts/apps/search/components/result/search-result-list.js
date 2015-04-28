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
        <div id="search-result-list-wrapper">
          <div className="content-section alt-content-section search-header-section space-bottom-sm space-top-sm">
            <div className="container">
              <p className='search-header-text'>
                Contracts containing confidential within the same sentence as disclosure and notifications due within 90
                days
              </p>
            </div>
          </div>

          <div className="content-section default-content-section search-count-section space-top-md space-bottom-sm">
            <div className="container">

              <div className='search-results-count content-section-item space-bottom-sm'>
                17 Results Found
              </div>

              <div className="search-adjust content-section-item ">
                <button className="btn btn-info btn-sm sort-search-button content-section-item space-right-md"
                        type="button">
                  <span className='middle'>Sort By: Date Created</span>
                  <i className="fa fa-chevron-down space-left middle"></i>
                </button>
                <button className="btn btn-info btn-sm refine-search-button" type="button">
                  <i className="fa fa-wrench space-right"></i>
                  <span>Refine Search</span>
                </button>
              </div>
            </div>
          </div>

          <div className="content-section default-content-section search-results-section">
            <div className="container">
              <div className="search-results">

                <div className="content-section-item space-top-sm">
                  <SearchResultItem />
                </div>

                <div className="content-section-item space-top-sm">
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
