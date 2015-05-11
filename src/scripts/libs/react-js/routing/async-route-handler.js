'use strict';

import React from 'react';
import Router  from 'react-router';

function getAsyncTransition(state) {

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

  return (Handler, state) => {

    const asyncTransitionPromise = getAsyncTransition(state);

    renderHandler(Handler, true);

    asyncTransitionPromise.then(() => renderHandler(Handler, false));
  };
}

export default {getHandler};
