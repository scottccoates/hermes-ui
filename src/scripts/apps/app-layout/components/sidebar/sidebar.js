'use strict';

import React from 'react';

import ScrollContainer from 'src/scripts/libs/react-js/components/scroll-container.js!jsx';

import SidebarLogo from './sidebar-logo.js!jsx';
import SidebarNavSection from './sidebar-nav-section.js!jsx';

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
