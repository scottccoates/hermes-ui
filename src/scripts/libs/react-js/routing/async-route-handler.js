'use strict';

import React from 'react';
import Router  from 'react-router';

function getAsyncTransitionPromises(state) {

  var asyncTransitionRoutes = (
    state.routes
      .filter(route => route.handler.asyncTransition)
      .map(route =>
        route.handler.asyncTransition(state.params))
  );

  //flatten http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript
  asyncTransitionRoutes = [].concat.apply([], asyncTransitionRoutes);

  const asyncTransitionPromises = Promise.all(asyncTransitionRoutes);

  return asyncTransitionPromises;
}

function getHandler(containerId) {

  function renderHandler(Handler, loading) {
    React.render(<Handler loading={loading}/>, document.getElementById(containerId));
  }

  return async function (handler, state) {
    renderHandler(handler, true);
    await getAsyncTransitionPromises(state);
    renderHandler(handler, false);
  };
}

export default {getHandler};
