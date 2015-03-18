'use strict';

import React from 'react';
import ReactBootstrap from 'react-bootstrap';
import Router  from 'react-router';

// use the min file because it doesn't have a dep on the css! file, which we don't want to inject into our html doc.
import Bootstrap from 'bootstrap/js/bootstrap.min';

const {DropdownButton, MenuItem} = ReactBootstrap;

const {Link} = Router;

export default React.createClass({

  render: function () {
    return (
        <section className="header-nav-section">

          <ul>

            <li className="header-item header-profile">
              <a data-target="#" href="#" data-toggle="dropdown">
                <img alt="header profile image" className="header-profile-image" src="build/assets/images/man-profile-pic.jpg"/>
                <span className="header-profile-name">Andy
                  <i className="fa fa-caret-down"></i>
                </span>
              </a>
              <ul className="dropdown-body dropdown-body-right" role="menu">
                <li role="presentation">
                  <a role="menuitem" href="#">Dashboard</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" href="#">Edit Profile</a>
                </li>
                <li role="presentation">
                  <a role="menuitem" href="#">Admin</a>
                </li>
                <li role="presentation" className="divider"></li>
                <li role="presentation">
                  <a role="menuitem" href="#">Logout</a>
                </li>
              </ul>
            </li>

            <li className="header-item header-alerts">
              <i className="fa fa-bell-o"></i>
            </li>

            <li className="header-item header-help">
              <span>Help
                <i className="fa fa-caret-down"></i>
              </span>
            </li>

            <li className="header-item header-new-mi">
              <Link activeClassName={""} to="new" className="btn btn-primary btn-xs">New Contract</Link>
            </li>
          </ul>
        </section>
    );
  }
});

