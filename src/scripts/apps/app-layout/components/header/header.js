'use strict';

import React from 'react';
import HeaderSearch from './header-search.js!jsx';
import HeaderNavSection from './header-nav-section.js!jsx';

export default React.createClass({

  render() {
    return (
        <header id="header-wrapper">
          <HeaderSearch/>
          <HeaderNavSection/>
        </header>
    );
  }
});
