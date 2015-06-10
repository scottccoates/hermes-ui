// https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html

import React from 'react';

export default (Component, props, stubs) => {
  function RouterStub() {
  }

  Object.assign(RouterStub, {
    makePath () {
    },
    makeHref () {
    },
    transitionTo () {
    },
    replaceWith () {
    },
    goBack () {
    },
    getCurrentPath () {
    },
    getCurrentRoutes () {
    },
    getCurrentPathname () {
    },
    getCurrentParams () {
    },
    getCurrentQuery () {
    },
    isActive () {
    },
    getRouteAtDepth() {
    },
    setRouteComponentAtDepth() {
    }
  }, stubs);

  return React.createClass({
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number
    },

    getChildContext () {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },

    render () {
      return <Component {...props} />
    }
  });
};
