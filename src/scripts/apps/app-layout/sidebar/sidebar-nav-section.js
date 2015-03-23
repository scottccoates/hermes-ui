'use strict';

import React from 'react';

export default React.createClass({

  render() {
    return (
        <section>
          <ul>
            <li>
              <i className="fa fa-home"></i>
              <span>Dashboard</span>
            </li>
            <li>
              <i className="fa fa-file-text"></i>
              <span>Contracts</span>
            </li>
            <li>
              <i className="fa fa-calendar"></i>
              <span>Calendar</span>
            </li>
            <li>
              <i className="fa fa-bar-chart"></i>
              <span>Reports</span>
            </li>
          </ul>
        </section>
    );
  }
});
