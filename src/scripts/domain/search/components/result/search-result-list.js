'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function (searchResultItemProvider) {

  const SearchResultItem = searchResultItemProvider.dependency;

  const component = React.createClass({
    displayName: "SearchResultList",

    render() {
      return (
        <div id="search-result-list-wrapper">

          <div className='search-results-count content-section-item space-top-md space-bottom-sm'>
            2 Results Found
          </div>

          <div className='content-section-item space-bottom'>
            <button className="btn btn-info btn-sm content-section-item space-right-md" type="button">
              <span className='middle'>Sort By: Date Created</span>
              <i className="fa fa-chevron-down space-left middle"></i>
            </button>

            <button className="btn btn-info btn-sm" type="button">
              <i className="fa fa-wrench space-right"></i>
              <span>Refine Search</span>
            </button>
          </div>


          <div className="search-results">

            <div className="content-section-item space-top-sm">
              <SearchResultItem searchResultSubject="Licensing Agreement Between Microsoft and Hermes, Inc.
                      for Microsoft Office Suite Products" searchResultOwner="Microsoft"
                                searchResultImage="/assets/images/client-side/microsoft-logo.jpg"
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
                searchResultImage="/assets/images/client-side/adobe-logo.jpg"
                searchResultEntityType="Licensing Agreement"
                searchResultAdditionalDetails="1 upcoming task"
                searchResultContent="… Licensee Right to Terminate. Licensee shall have the right
                        to … all rights granted to Licensee under this Agreement shall forthwith terminate and
                        immediately revert to Licensor … and within a reasonable period, Licensee's sole recourse shall be to terminate the Agreement and
                        Licensor's sole obligation shall be …"/>
            </div>
          </div>
        </div>
      );
    }
  });

  return new DependencyProvider(component);
};
