'use strict';

import React from 'react';
import Router  from 'react-router';
import EventEmitter from 'eventemitter3';

const loadingEvents = new EventEmitter();

function fetchData(routes, params) {
  const data = {};

  return Promise.all(routes
      .filter(route => route.handler.fetchData)
      .map(route => {
        return route.handler.fetchData(params).then(d => {
          data[route.name] = d;
        });
      }))
      .then(() => data);
}

function getHandler(containerId) {
  return (Handler, state) => {
    loadingEvents.emit('loadStart');

    React.render(<Handler/>, document.getElementById(containerId));
  };
}

export default {getHandler};
