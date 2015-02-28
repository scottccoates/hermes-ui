'use strict';

import React from 'react';

export default
class HeaderNavSection extends React.Component {

  render() {
    return (
        <span className="header-actions">
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
}
