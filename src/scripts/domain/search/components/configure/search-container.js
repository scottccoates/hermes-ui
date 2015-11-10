'use strict';

import React from 'react';
import Bacon from 'baconjs';
import ReactBacon from 'react-bacon';

export default React.createClass({
  displayName: "SearchContainer",
  mixins: [ReactBacon.BaconMixin],

  onAdvancedSearchClick(e) {
    e.preventDefault();
    this.props.onAdvancedSearchClick();
  },

  render() {
    return (
      <div className="search-container">

        <ul className="search-list">
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

          <li className="agreement-search-link">
            <ul>
              <li>
                <a className="search-link" href="javascript:void(0)">
                  <i className="fa fa-edit"></i>
                  <span>Agreements Recently Edited</span>
                </a>
              </li>
              <li>
                <a className="search-link" href="javascript:void(0)">
                  <i className="fa fa-calendar"></i>
                  <span>Agreements Expiring Soon</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    );
  }
});
