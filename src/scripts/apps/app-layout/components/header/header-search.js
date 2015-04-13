'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';

import Dropdown from 'src/libs/components/dropdown';

import HeaderSearchDropdown from 'src/apps/app-layout/components/header/header-search-dropdown';
import HeaderAdvancedSearchDropdown from 'src/apps/app-layout/components/header/header-advanced-search-dropdown';

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

            <Dropdown open={this.state.searchDropdownEnabled} onClose={this.onHeaderSearchClose}>
              <HeaderSearchDropdown onAdvancedSearchClick={this.onAdvancedSearchClick}/>
            </Dropdown>

            <Dropdown open={this.state.advancedSearchDropdownEnabled} onClose={this.onHeaderAdvancedSearchClose}>
              <HeaderAdvancedSearchDropdown />
            </Dropdown>

          </div>
        </div>
    );
  },

  onHeaderSearchClose() {
    this.setState({searchDropdownEnabled: false});
  },

  onHeaderAdvancedSearchClose() {
    this.setState({advancedSearchDropdownEnabled: false});
  },

  onAdvancedSearchClick() {
    this.setState({searchDropdownEnabled: false, advancedSearchDropdownEnabled: true});
  }
});
