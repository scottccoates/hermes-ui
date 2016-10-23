'use strict';

import React from 'react';

import {Link}  from 'react-router';

import {Dropdown} from 'react-bootstrap';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function () {

  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'HeaderNavSectionComponent';
    }

    render() {
      return (
        <section className="header-nav-section">

          <ul>
            <Dropdown className="header-item header-profile" componentClass="li" id="profile-dropdown">
              <Dropdown.Toggle useAnchor={true} noCaret>
                <img alt="header profile image" className="header-profile-image"
                     src={this.props.user.identity.picture}/>
              <span className="header-profile-name">{this.props.user.identity.nickname}
                <i className="fa fa-caret-down space-left middle"/>
              </span>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-arrow-right">
                <li role="presentation">
                  <Link role="menuitem" to="/dashboard">Dashboard</Link>
                </li>
                <li role="presentation" className="divider"/>
                <li role="presentation">
                  <Link to="/logout">Logout</Link>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <li className="header-item header-alerts">
              <i className="fa fa-bell-o middle"/>
            </li>

            <Dropdown className="header-item header-help" componentClass="li" id="profile-dropdown">
              <Dropdown.Toggle useAnchor={true} noCaret>
                <span>
                  Help
                  <i className="fa fa-caret-down space-left middle"/>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-arrow-left">
                <li role="presentation">
                  <Link role="menuitem" to="/support">Support</Link>
                </li>
              </Dropdown.Menu>
            </Dropdown>

            <li className="header-item header-new-agreement">
              <Link activeClassName="" to="/agreements/step-1/" className="btn btn-primary btn-xs">New Agreement</Link>
            </li>
          </ul>
        </section>
      );
    }
  }

  return new DependencyProvider(Component);
}
