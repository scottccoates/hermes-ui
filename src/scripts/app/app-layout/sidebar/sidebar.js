'use strict';

import React from 'react';
import SidebarProfile from './sidebar-profile';
import SidebarNavSection from './sidebar-nav-section';
import ScrollContainer from '../../components/scroll-container';

export default React.createClass({

  render: function () {

    return (
        <nav id="sidebar-wrapper">
          <ScrollContainer id="sidebar-scroll-container">
            <SidebarProfile/>
            <SidebarNavSection/>
            <SidebarNavSection/>
            <SidebarNavSection/>
          </ScrollContainer>
        </nav>
    )
  }
});
