'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function () {

  const component = React.createClass({
    render() {
      return (
          <div id="agreement-wrapper">
            <RouteHandler/>
          </div>
      );
    }
  });

  return new DependencyProvider(component);
};
