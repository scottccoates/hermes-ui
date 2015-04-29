'use strict';

import React from 'react';
import Bacon from 'bacon';
import ReactBacon from 'react-bacon';
import ReactBootstrap from 'react-bootstrap';

import TextSearchField from 'src/apps/app-layout/components/header/header-advanced-text-search-field'
import ApolloSearchField from 'src/apps/app-layout/components/header/header-advanced-apollo-search-field'
import DateSearchField from 'src/apps/app-layout/components/header/header-advanced-date-search-field'

export default React.createClass({
  displayName: "HeaderAdvancedSearchDropdown",

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [ReactBacon.BaconMixin],

  doSearch() {
    this.context.router.transitionTo('search');
    this.props.close();
  },

  render() {
    return (

      <div className="popover advanced-search-popover">
        <div className="popover-title">Find Contracts</div>
        <div className="popover-content">
          <ul>
            <li><TextSearchField iconClass='fa-search' fieldLabel="Contains the words"/></li>
            <li><ApolloSearchField iconClass='fa-cubes' fieldLabel="Terms and connectors"/></li>
            <li><TextSearchField iconClass='fa-building' fieldLabel="Counterparty"/></li>
            <li><TextSearchField iconClass='fa-tag' fieldLabel="All of the tags"/></li>
            <li><TextSearchField iconClass='fa-user' fieldLabel="Owner"/></li>
            <li><TextSearchField iconClass='fa-file' fieldLabel="Type of contract"/></li>
            <li><DateSearchField iconClass='fa-calendar' fieldLabel='Notifactions due in the next'/></li>
            <li><DateSearchField iconClass='fa-clock-o' fieldLabel='Expires in the next'/></li>
            <li className="search-field more-fields-link">
              <i className="fa fa-search-plus"></i>
              <span className="search-field-label">Search by another field
              </span>
              <i className="fa fa-chevron-down more-fields-icon"></i>
            </li>
          </ul>

          <div className="advanced-search-button">
            <button className="btn btn-sm btn-primary" onClick={this.doSearch}>Search</button>
          </div>

        </div>
      </div>
    );
  }
});
