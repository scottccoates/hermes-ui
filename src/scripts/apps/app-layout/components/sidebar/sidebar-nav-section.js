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
            <i className="fa fa-home middle space-right-lg"></i>
            <Link to="dashboard" className='middle'>Dashboard</Link>
          </li>
          <li>
            <i className="fa fa-file-text middle space-right-lg"></i>
            <span className='middle'>Contracts</span>
          </li>
          <li>
            <i className="fa fa-calendar middle space-right-lg"></i>
            <span className='middle'>Calendar</span>
          </li>
          <li>
            <i className="fa fa-bar-chart middle space-right-lg"></i>
            <span className='middle'>Reports</span>
          </li>
        </ul>
      </section>
    );
  }
});
