'use strict';

import React from 'react';
import Router  from 'react-router';

const {Link} = Router;

export default React.createClass({

  render() {
    return (
        <section>
          <ul>
            <li>
              <i className="fa fa-home"></i>
              <Link to="dashboard">Dashboard</Link>
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
