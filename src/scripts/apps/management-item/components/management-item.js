'use strict';

import React from 'react';
import Router  from 'react-router';

import ComponentProvider from 'src/libs/components/component-provider';

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

  return new ComponentProvider(component);
};
