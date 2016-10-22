'use strict';

import React from 'react';

import DependencyProvider from '../../../../libs/dependency-injection/utils/dependency-provider';

export default function (headerSearchComponent, headerNavSectionComponent) {

  const HeaderSearch     = headerSearchComponent.dependency;
  const HeaderNavSection = headerNavSectionComponent.dependency;

  const header = React.createClass({
    displayName: "HeaderComponent",

    render() {
      return (
        <header id="header-wrapper">
          <HeaderSearch/>
          <HeaderNavSection user={this.props.user}/>
        </header>
      );
    }
  });

  return new DependencyProvider(header);
}
