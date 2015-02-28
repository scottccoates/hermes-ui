'use strict';

import React from 'react';
import SidebarProfileImage from './sidebar-profile-image';
import SidebarProfileName from './sidebar-profile-name';

export default
class SidebarProfile extends React.Component {

  render() {
    return (
        <div className="sidebar-profile">
          <SidebarProfileImage/>
          <SidebarProfileName/>
        </div>
    );
  }
}
