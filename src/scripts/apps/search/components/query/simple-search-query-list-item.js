'use strict';

import React from 'react';

import {Link} from 'react-router';

import Highlighter from 'react-highlighter';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  const searchQueryList = React.createClass({
    displayName: "SimpleSearchQueryListItemComponent",

    propTypes: {
      id: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired,
      query: React.PropTypes.string.isRequired,
      onItemSelected: React.PropTypes.func.isRequired
    },

    onItemClick(e) {
      this.props.onItemSelected(this.props.id);
    },

    render() {
      return (
        <Link to={`/agreements/${this.props.id}`} className="search-link" onClick={this.onItemClick}>

          <i className="fa fa-file"></i>
          <Highlighter search={this.props.query} caseSensitive={false}>
            {this.props.name}
          </Highlighter>

        </Link>

      );
    }
  });

  return new DependencyProvider(searchQueryList);
}
