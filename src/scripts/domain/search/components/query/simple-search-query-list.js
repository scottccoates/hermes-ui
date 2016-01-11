'use strict';

import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (searchQueryListItemComponent) {

  const SearchQueryListItem = searchQueryListItemComponent.dependency;

  const searchContainer = React.createClass({
    displayName: "SimpleSearchQueryListComponent",

    propTypes: {
      count: React.PropTypes.number,
      results: React.PropTypes.array,
      loading: React.PropTypes.bool,
      query: React.PropTypes.string,
      onItemSelected: React.PropTypes.func
    },

    getDefaultProps() {
      return {
        count: 0,
        results: [],
        loading: false,
        query: '',
        onItemSelected: function () {
        }
      }
    },

    onAdvancedSearchClick(e) {
      e.preventDefault();
      this.onItemSelected();
      this.props.onAdvancedSearchClick();
    },

    onItemSelected(){
      this.props.onItemSelected();
    },

    render() {

      let loadingNode;
      if (this.props.loading) {
        loadingNode = (
          <li className="search-link">
            Loading
          </li>
        );
      }

      let emptyNode;
      const isEmpty = this.props.query && !this.props.count && !this.props.loading;
      if (isEmpty) {
        emptyNode = (
          <li className="search-link">
            Sorry, no results for "{this.props.query}"
          </li>
        );
      }

      let moreNode;
      const hasResults = this.props.query && this.props.count && !this.props.loading;
      if (hasResults) {
        moreNode = (
          <li className="search-link">
            Show more
          </li>
        );
      }

      const resultNodes = this.props.results.map(r => {
        return (
          <li key={r.id}>
            <SearchQueryListItem id={r.id} name={r.name} query={this.props.query}
                                 onItemSelected={this.props.onItemSelected}/>
          </li>
        );
      });

      return (

        <ul className="simple-search-query-list">
          <li className="agreement-search-link">
            <ul>
              {loadingNode}
              {emptyNode}
              {resultNodes}
              {moreNode}
            </ul>
          </li>

          <li id="advanced-search-link">
            <ul>
              <li>

                <a className="search-link" href="javascript:void(0)" onClick={this.onAdvancedSearchClick}>
                  <i className="fa fa-wrench"></i>
                  <span>Advanced Search</span>
                </a>

              </li>
            </ul>
          </li>

        </ul>
      );
    }
  });

  return new DependencyProvider(searchContainer);
}
