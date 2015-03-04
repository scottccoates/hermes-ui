'use strict';

import React from 'react';
import HeaderSearch from './header-search';
import HeaderNavSection from './header-nav-section';

export default React.createClass({

  render: function () {
    return (
        <header id="header-wrapper">
          <HeaderSearch/>
          <HeaderNavSection/>
        </header>
    );
  }
});
