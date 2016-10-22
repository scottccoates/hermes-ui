'use strict';

import React, { PropTypes } from 'react';

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
          <SidebarLogo/>
          <SidebarNavSection onSmartViewSelected={Component.onSmartViewSelected}
                             smartViews={this.props.userSmartViews.smartViews}/>
        </nav>
      );
    }
  }

  Component.propTypes = {
    userSmartViews: PropTypes.object.isRequired
  };

  return new DependencyProvider(Component);
}
