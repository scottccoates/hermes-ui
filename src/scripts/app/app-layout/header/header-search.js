'use strict';

import React from 'react';

export default
class HeaderSearch extends React.Component {

  render() {
    return (
        <span className="header-search">
          <i className="fa fa-search search-icon header-icon"></i>
          Search for contract, counterparty, or category
        </span>

    );
  }
}
