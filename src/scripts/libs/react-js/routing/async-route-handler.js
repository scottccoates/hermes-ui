'use strict';

import React from 'react';
import Router  from 'react-router';
import { Provider } from 'react-redux';

function performAsyncTransition(flux, state) {

  var asyncTransitionRoutes = (
    state.routes
      .filter(route => route.handler.asyncTransition)
      .map(route =>
        route.handler.asyncTransition(flux, state))
  );

  //flatten http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
  asyncTransitionRoutes = [].concat.apply([], asyncTransitionRoutes);

  const asyncTransitionPromises = Promise.all(asyncTransitionRoutes);

  return asyncTransitionPromises;
}

function getHandler(containerId, store) {

  function renderHandler(Handler, loading) {
    React.render(<Handler/>, document.getElementById(containerId));
  }

  return function (handler, state) {
    renderHandler(handler);
    performAsyncTransition(fluxInstance, state);
  };
}

export default {getHandler};
