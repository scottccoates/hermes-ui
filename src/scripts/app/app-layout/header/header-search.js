'use strict';

import React from 'react';

export default React.createClass({

  render: function () {
    return (
        <span className="header-search">
          <i className="fa fa-search search-icon header-icon"></i>
          Search for contract, counterparty, or category
        </span>
    );
  }
});
