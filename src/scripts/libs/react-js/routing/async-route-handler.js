'use strict';

import React from 'react';
import Router  from 'react-router';
import FluxComponent from 'flummox/component';

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

function getHandler(containerId, fluxInstance) {

  function renderHandler(Handler, loading) {

    const handler = (
      <FluxComponent flux={fluxInstance}>
        <Handler/>
      </FluxComponent>
    );

    React.render(handler, document.getElementById(containerId));
  }

  return function (handler, state) {
    renderHandler(handler);
    performAsyncTransition(fluxInstance, state);
  };
}

export default {getHandler};
