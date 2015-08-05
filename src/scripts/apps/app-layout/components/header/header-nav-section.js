'use strict';

import React from 'react';
import ReactBacon from 'react-bacon';

import Router  from 'react-router';
import ConnectToStores from 'flummox/connect';

import FocusContainer from '../../../../libs/react-js/components/focus-container';
import DisplayContainer from '../../../../libs/react-js/components/display-container';

const {Link} = Router;

var headerNavSection = React.createClass({
  displayName: "HeaderNavSection",
  mixins: [ReactBacon.BaconMixin],

  getInitialState() {
    return {
      profileDropdownEnabled: false
    };
  },

  componentWillMount() {
    const clickStream = this.eventStream('onClick');

    clickStream.filter(() => !this.state.profileDropdownEnabled).subscribe(()=>this.setState({profileDropdownEnabled: true}));
  },

  onDropdownClose() {
    this.setState({profileDropdownEnabled: false});
  },

  render() {
    return (
      <section className="header-nav-section">

        <ul>

          <li className="header-item header-profile">
            <a href="javascript:void(0)" onClick={this.onClick}>
              <img alt="header profile image" className="header-profile-image"
                   src={this.props.user.picture}/>
              <span className="header-profile-name">{this.props.user.nickname}
                <i className="fa fa-caret-down space-left middle"></i>
              </span>
            </a>
            <FocusContainer inFocus={this.state.profileDropdownEnabled} onClose={this.onDropdownClose}>
              <DisplayContainer open={this.state.profileDropdownEnabled}>
                <ul className="dropdown-menu dropdown-menu-right dropdown-menu-arrow dropdown-menu-arrow-right">
                  <li role="presentation">
                    <a role="menuitem" href="javascript:void(0)">Dashboard</a>
                  </li>
                  <li role="presentation">
                    <a role="menuitem" href="javascript:void(0)">Edit Profile</a>
                  </li>
                  <li role="presentation">
                    <a role="menuitem" href="javascript:void(0)">Admin</a>
                  </li>
                  <li role="presentation" className="divider"></li>
                  <li role="presentation">
                    <Link to="logout">Logout</Link>
                  </li>
                </ul>
              </DisplayContainer>
            </FocusContainer>

          </li>

          <li className="header-item header-alerts">
            <i className="fa fa-bell-o middle"></i>
          </li>

          <li className="header-item header-help">
            <span>Help
              <i className="fa fa-caret-down space-left middle"></i>
            </span>
          </li>

          <li className="header-item header-new-agreement">
            <Link activeClassName="" to="createAgreement" className="btn btn-primary btn-xs">New Contract</Link>
          </li>
        </ul>
      </section>
    );
  }
});

headerNavSection = ConnectToStores(headerNavSection, "SessionStore");
export default headerNavSection;
