'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (headerSearchComponent, headerNavSectionComponent) {

  const HeaderSearch     = headerSearchComponent.dependency;
  const HeaderNavSection = headerNavSectionComponent.dependency;

  class Component extends React.Component {
    
    constructor(props, context) {
      super(props, context);

      this.displayName = 'HeaderComponent';
    }

    render() {
      return (
        <header id="header-wrapper">
          <HeaderSearch/>
          <HeaderNavSection user={this.props.user}/>
        </header>
      );
    }
  }

  return new DependencyProvider(Component);
}
