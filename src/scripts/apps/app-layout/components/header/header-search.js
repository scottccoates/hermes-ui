'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

import FocusContainer from 'src/scripts/libs/react-js/components/focus-container.js!jsx';
import DisplayContainer from 'src/scripts/libs/react-js/components/display-container.js!jsx';

import SearchContainer from 'src/scripts/apps/search/components/configure/search-container.js!jsx';
import AdvancedSearchContainer from 'src/scripts/apps/search/components/configure/advanced-search-container.js!jsx';

export default React.createClass({
  displayName: "HeaderSearch",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      searchDropdownEnabled: false,
      advancedSearchDropdownEnabled: false
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');

    clickStream.filter(() => !this.state.searchDropdownEnabled).subscribe(()=>this.setState({searchDropdownEnabled: true}));
  },

  render() {
    return (
      <div className="header-search">
          <span>
            <i className="fa fa-search search-icon header-icon"></i>
            <input type="text" onClick={this.onClick} className="search-box" placeholder="Search"/>
          </span>

        <div>

          <FocusContainer inFocus={this.state.searchDropdownEnabled} onClose={this.onSearchClose}>
            <DisplayContainer open={this.state.searchDropdownEnabled}>
              <div className="popover search-popover">
                <div className="popover-content">
                  <SearchContainer onAdvancedSearchClick={this.onAdvancedSearchClick}/>
                </div>
              </div>
            </DisplayContainer>

          </FocusContainer>

          <FocusContainer inFocus={this.state.advancedSearchDropdownEnabled} onClose={this.onAdvancedSearchClose}>
            <DisplayContainer open={this.state.advancedSearchDropdownEnabled}>
              <div className="popover advanced-search-popover">
                <div className="popover-title">Find Contracts</div>
                <div className="popover-content">
                  <AdvancedSearchContainer close={this.onHeaderAdvancedSearchClose}/>
                </div>
              </div>
            </DisplayContainer>

          </FocusContainer>

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
