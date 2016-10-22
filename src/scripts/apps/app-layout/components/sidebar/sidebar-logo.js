import React from 'react';
import {Link} from 'react-router';

const logo = require('../../.././../../assets/images/medium-logo.svg');
// not using import syntax
// Parse errors in imported module
// i noticed other webpack templates DID use the es6 import syntax

export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.displayName = 'SidebarLogoComponent';
  }

  render() {
    return (
      <div className="sidebar-logo">
        <Link to="/">
          <img alt="Willow Logo" className="sidebar-logo-image" src={logo}/>
        </Link>
      </div>
    );
  }
}
