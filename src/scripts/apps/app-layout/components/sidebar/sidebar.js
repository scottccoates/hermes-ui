'use strict';

import React from 'react';

import ScrollContainer from 'src/libs/react-js/components/scroll-container';

import SidebarLogo from './sidebar-logo';
import SidebarNavSection from './sidebar-nav-section';

export default React.createClass({

  render() {

    return (
        <nav id="sidebar-wrapper">
          <ScrollContainer id="sidebar-scroll-container">
            <SidebarLogo/>
            <SidebarNavSection/>
          </ScrollContainer>
        </nav>
    )
  }
});
