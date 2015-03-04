'use strict';

import React from 'react';

export default React.createClass({

  render: function () {
    return (
        <span className="header-nav-section">
          <span className="header-icon">
            <i className="fa fa-caret-square-o-down"></i>
          </span>
          <span className="header-icon">
            <i id="header-icon-calendar" className="fa fa-calendar"></i>
          </span>
          <span className="header-icon">
            <i className="fa fa-th"></i>
          </span>
        </span>
    );
  }
});
