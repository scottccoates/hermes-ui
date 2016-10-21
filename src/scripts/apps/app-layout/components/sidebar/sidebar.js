'use strict';

import React from 'react';

import { connect } from 'react-redux';

import SidebarLogo from './sidebar-logo';
import SidebarNavSection from './sidebar-nav-section';

export default function (smartViewActions) {
  let component = React.createClass({
    displayName: "SidebarComponent",

    onSmartViewSelected(smartView){
      smartViewActions.selectSmartViewEdit(smartView);
    },

    render() {

      return (
        <nav id="sidebar-wrapper">
          <ScrollContainer id="sidebar-scroll-container">
            <SidebarLogo/>
            <SidebarNavSection onSmartViewSelected={this.onSmartViewSelected}
                               smartViews={this.props.userSmartViews.smartViews}/>
          </ScrollContainer>
        </nav>
      )
    }
  });

  function extracted(state) {
    return {
      userSmartViews: state.userSmartViews
    };
  }

  component = connect(extracted)(component);
  return new DependencyProvider(component);
}
