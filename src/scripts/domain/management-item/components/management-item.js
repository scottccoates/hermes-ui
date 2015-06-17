'use strict';

import React from 'react';
import Router  from 'react-router';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

const {Link, RouteHandler} = Router;

export default function () {

  const component = React.createClass({
    render() {
      return (
          <div id="mi-wrapper">
            <RouteHandler/>
          </div>
      );
    }
  });

  return new DependencyProvider(component);
};
