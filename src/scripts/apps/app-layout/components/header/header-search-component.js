'use strict';

import React from 'react';

import SearchContainer from '../../../../domain/search/components/query/search-query-container';
import AdvancedSearchContainer from '../../../../domain/search/components/query/advanced-search-query-container';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (searchQueryContainerComponent, searchQueryInputBoxComponent) {
  const SearchQueryContainer = searchQueryContainerComponent.dependency;
  const SearchQueryInputBox  = searchQueryInputBoxComponent.dependency;

  const headerSearch = React.createClass({
    displayName: "HeaderSearchComponent",

    render() {

      return (
        <div className="header-search">
          <SearchQueryInputBox/>

          <div className="dropdown-menu popover search-popover">
            <div className="popover-content">
              <SearchQueryContainer onAdvancedSearchClick={this.onAdvancedSearchClick}/>
            </div>
          </div>

          <div>

            {/*
             <FocusContainer inFocus={this.state.searchDropdownEnabled} onClose={this.onSearchClose}>
             <DisplayContainer open={this.state.searchDropdownEnabled}>
             <div className="popover search-popover">
             <div className="popover-content">
             <SearchQueryContainer onAdvancedSearchClick={this.onAdvancedSearchClick}/>
             </div>
             </div>
             </DisplayContainer>

             </FocusContainer>

             <FocusContainer inFocus={this.state.advancedSearchDropdownEnabled} onClose={this.onAdvancedSearchClose}>
             <DisplayContainer open={this.state.advancedSearchDropdownEnabled}>
             <div className="popover advanced-search-popover">
             <div className="popover-title">Find Agreements</div>
             <div className="popover-content">
             <AdvancedSearchContainer close={this.onHeaderAdvancedSearchClose}/>
             </div>
             </div>
             </DisplayContainer>

             </FocusContainer>
             */}
          </div>
        </div>
      );
    },

    onSearchClose() {
      this.setState({searchDropdownEnabled: false});
    },

    onAdvancedSearchClose() {
      this.setState({advancedSearchDropdownEnabled: false});
    },

    onAdvancedSearchClick() {
      this.setState({searchDropdownEnabled: false, advancedSearchDropdownEnabled: true});
    }
  });
  return new DependencyProvider(headerSearch);
}
