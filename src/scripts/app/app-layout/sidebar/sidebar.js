'use strict';

import React from 'react';

import ScrollContainer from 'src/app/components/scroll-container';

import SidebarLogo from './sidebar-logo';
import SidebarNavSection from './sidebar-nav-section';

export default React.createClass({

  render: function () {

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
