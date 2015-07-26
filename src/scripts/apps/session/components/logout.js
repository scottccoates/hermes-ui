// This doesn't need to be a react component, it never really renders anything.
// However, we might want to show some type of logout page or something?
import React from 'react';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import ConnectToStores from 'flummox/connect';

export default function () {
  const logout = React.createClass({
    displayName: "Logout",
    contextTypes: {
      router: React.PropTypes.func
    },

    async componentWillReceiveProps(nextProps){
      if (nextProps.loggedIn) {
        const sessionActions = this.props.flux.getActions('SessionActions');
        await sessionActions.logout(); // unhandled not reported unless awaited
      }
      else {
        this.context.router.transitionTo('login');
      }
    },

    render() {
      return (
        <div id="logout-wrapper"></div>
      );
    }
  });

  return new DependencyProvider(ConnectToStores(logout, 'sessionStore'));
};
