'use strict';

import React from 'react';
import {Link}  from 'react-router';

export default React.createClass({
  displayName: "SidebarNavSectionComponent",

  render() {

    const smartViewNodes = this.props.smartViews.map(s =>(
      <li key={s.id}>
        <Link to={s.url} className='middle' onClick={this.props.onSmartViewSelected.bind(null,s)}>{s.name}</Link>
      </li>
    ));

    return (
      <div>
        <section>
          <ul>
            <li>
              <i className="fa fa-home middle space-right-lg"></i>
              <Link to="/dashboard" className='middle'>Dashboard</Link>
            </li>
            <li>
              <i className="fa fa-file-text middle space-right-lg"></i>
              <span className='middle'>Agreements</span>
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

        <section>
          <div className='header'>
            <span>Smart Views</span>
          </div>
          <ul>
            {smartViewNodes}
          </ul>
        </section>
      </div>
    );
  }
});
