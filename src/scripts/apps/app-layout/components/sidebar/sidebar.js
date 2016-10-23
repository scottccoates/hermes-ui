'use strict';

import React, { PropTypes } from 'react';

import {connect} from 'react-redux';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

import SidebarLogo from './sidebar-logo';
import SidebarNavSection from './sidebar-nav-section';

export default function (smartViewActions) {

  class Component extends React.Component {

    static onSmartViewSelected(smartView) {
      smartViewActions.selectSmartViewEdit(smartView);
    }

    constructor(props, context) {
      super(props, context);

      this.displayName = 'SidebarComponent';
    }

    render() {

      return (
        <nav id="sidebar-wrapper">
          <div id="sidebar-scroll-container">
            <SidebarLogo/>
            <SidebarNavSection onSmartViewSelected={Component.onSmartViewSelected}
                               smartViews={this.props.userSmartViews.smartViews}/>
          </div>
        </nav>
      );
    }
  }

  Component.propTypes = {
    userSmartViews: PropTypes.object.isRequired
  };

  function extracted(state) {
    return {
      userSmartViews: state.userSmartViews
    };
  }

  return new DependencyProvider(connect(extracted)(Component));
}
