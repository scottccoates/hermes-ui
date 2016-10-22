'use strict';

import React, {PropTypes} from 'react';
import {Link}  from 'react-router';

export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.displayName = 'SidebarNavSectionComponent';
  }

  render() {

    const smartViewNodes = this.props.smartViews.map(s =>(
      <li key={s.id}>
        <Link to={s.url} className="middle" onClick={Component.onSmartViewSelected.bind(null,s)}>{s.name}</Link>
      </li>
    ));

    return (
      <div>
        <section>
          <ul>
            <li>
              <i className="fa fa-home middle space-right-lg"/>
              <Link to="/dashboard" className="middle">Dashboard</Link>
            </li>
            <li>
              <i className="fa fa-file-text middle space-right-lg"/>
              <Link to="/agreements" className="middle">Agreements</Link>
            </li>
            <li>
              <i className="fa fa-calendar middle space-right-lg"/>
              <Link to="/calendar" className="middle">Calendar</Link>
            </li>
            <li>
              <i className="fa fa-bar-chart middle space-right-lg"/>
              <Link to="/reports" className="middle">Reports</Link>
            </li>
          </ul>
        </section>

        <section>
          <div className="header">
            <span>Smart Views</span>
          </div>
          <ul>
            {smartViewNodes}
          </ul>
        </section>
      </div>
    );
  }
}

Component.propTypes = {
  smartViews: PropTypes.array.isRequired
};

