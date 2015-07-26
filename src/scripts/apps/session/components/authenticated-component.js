import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function (appFlux) {
  // This is a Factory, it returns a function - consumers will need to call `.get()`

  // this sort of feels like a hack, but we'll have to get around it
  // with react-router v1
  // https://github.com/rackt/react-router/pull/590
  const sessionStore = appFlux.getStore('SessionStore');

  return function (Component) {
    const authenticatedComponent = React.createClass({
      displayName: "AuthenticatedComponent",
      contextTypes: {
        router: React.PropTypes.func
      },

      statics: {
        willTransitionTo(transition){
          if (!sessionStore.state.loggedIn) {
            transition.redirect('login', {}, {'nextPath': transition.path});
          }
        }
      },

      render() {
        return <Component {...this.props}/>;
      }
    });

    return new DependencyProvider(authenticatedComponent);
  };
}
