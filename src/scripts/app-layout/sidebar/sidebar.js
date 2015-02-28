'use strict';

import React from 'react';
import SidebarProfile from './sidebar-profile';
import SidebarNavSection from './sidebar-nav-section';

export default
class Sidebar extends React.Component {

  render() {
    return (
        <nav id="sidebar-wrapper">
          <div id="sidebar-scroll-container">
            <SidebarProfile/>
            <SidebarNavSection/>
            <SidebarNavSection/>
            <SidebarNavSection/>
          </div>
        </nav>
    );
  }
}
