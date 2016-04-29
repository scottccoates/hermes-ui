'use strict';

import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render() {
    return (
      <div className="sidebar-logo">
        <Link to='/'>
          <img alt="Willow Logo" className="sidebar-logo-image" src="/assets/images/medium-logo.svg"/>
        </Link>
      </div>
    );
  }
});
