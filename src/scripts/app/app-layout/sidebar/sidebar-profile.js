'use strict';

import React from 'react';
import SidebarProfileImage from './sidebar-profile-image';
import SidebarProfileName from './sidebar-profile-name';

export default React.createClass({
  render: function () {
    return (
        <div className="sidebar-profile">
          <SidebarProfileImage/>
          <SidebarProfileName/>
        </div>
    );
  }
});
