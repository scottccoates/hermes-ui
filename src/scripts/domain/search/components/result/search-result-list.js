'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function (SearchResultItemProvider) {

  const SearchResultItem = SearchResultItemProvider.dependency;

  const component = React.createClass({
    render() {
      return (
        <div id="search-result-list-wrapper">
          <div className="content-section alt-content-section search-header-section space-bottom-sm space-top-sm">
            <div className="container">
              <p className='search-header-text'>
                Contracts containing licensee within the same sentence as terminate
              </p>
            </div>
          </div>

          <div className="content-section default-content-section search-count-section space-top-md space-bottom-sm">
            <div className="container">

              <div className='search-results-count content-section-item space-bottom-sm'>
                2 Results Found
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

          <div className="content-section default-content-section search-results-section space-bottom">
            <div className="container">
              <div className="search-results">

                <div className="content-section-item space-top-sm">
                  <SearchResultItem searchResultSubject="Licensing Agreement Between Microsoft and Hermes, Inc.
                      for Microsoft Office Suite Products" searchResultOwner="Microsoft"
                                    searchResultImage="./assets/images/microsoft-logo.png"
                                    searchResultEntityType="Licensing Agreement"
                                    searchResultAdditionalDetails="2 upcoming tasks"
                                    searchResultContent="… within a reasonable period, Licensee's sole recourse shall be to terminate the Agreement and
                        Licensor's sole obligation shall be … Licensee Right to Terminate. Licensee shall have the right
                        to … all rights granted to Licensee under this Agreement shall forthwith terminate and
                        immediately revert to Licensor and …"/>
                </div>

                <div className="content-section-item space-top-sm">
                  <SearchResultItem
                    searchResultSubject="Licensing Agreement Between Hermes Inc. and Adobe for Adobe Master Suite"
                    searchResultOwner="Adobe"
                    searchResultImage="./assets/images/adobe-logo.png"
                    searchResultEntityType="Licensing Agreement"
                    searchResultAdditionalDetails="1 upcoming task"
                    searchResultContent="… Licensee Right to Terminate. Licensee shall have the right
                        to … all rights granted to Licensee under this Agreement shall forthwith terminate and
                        immediately revert to Licensor … and within a reasonable period, Licensee's sole recourse shall be to terminate the Agreement and
                        Licensor's sole obligation shall be …"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
