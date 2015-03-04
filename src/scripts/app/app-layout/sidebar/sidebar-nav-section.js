'use strict';

import React from 'react';

export default React.createClass({

  render: function () {
    return (
        <section id="sidebar-main">
          <h6>main</h6>
          <ul>
            <li>
              <i className="fa fa-home"></i>
              <span>Home</span>
            </li>
            <li>
              <i className="fa fa-th-large"></i>
              <span>Dashboard</span>
            </li>
            <li>
              <i className="fa fa-briefcase"></i>
              <span>Contracts</span>
            </li>
          </ul>
        </section>
    );
  }
});
