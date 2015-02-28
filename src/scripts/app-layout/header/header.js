'use strict';

import React from 'react';
import HeaderSearch from './header-search';
import HeaderNavSection from './header-nav-section';

export default
class Header extends React.Component {

  render() {
    return (
        <header id="header-wrapper">
          <HeaderSearch/>
          <HeaderNavSection/>
        </header>
    );
  }
}
