import React from 'react';
import ConnectToStores from 'flummox/connect';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import log from 'loglevel';

export default function (auth0Lock) {

  var login = React.createClass({
    displayName: "AuthLogin",

    contextTypes: {
      router: React.PropTypes.func
    },

    _doLoginTransition(){
      // I'm not sure if there's a better way to completely reset the history by this point.
      // It'd be bad to be able to click back and go back to the login screen
      this.context.router.transitionTo(this.props.query.nextPath || '/');
    },

    componentDidMount(){
      // todo should this be handled by the router ?
      if (this.props.loggedIn) {
        // if they're already logged in, but visiting /login
        this._doLoginTransition(this.props.loggedIn);
      }
      else {
        // https://auth0.com/docs/libraries/lock/customization
        const lockOptions    = {
          sso: false,
          rememberLastLogin: false,
          closable: false,
          icon: '/assets/images/medium-logo-no-text.svg',
          authParams: {
            scope: 'openid email user_metadata app_metadata picture'
          }
        };
        const sessionActions = this.props.flux.getActions('SessionActions');

        auth0Lock.show(lockOptions, async (error, profile, idToken)=> {
          if (error) throw new Error(`Error authenticating: ${idToken}. Inner exception: ${error.stack}`);
          try {
            log.info("Beginning: Log in user: %s", profile.nickname);
            await sessionActions.login(idToken, profile);
            log.info("Completed: Log in user: %s", profile.nickname);
            this._doLoginTransition();
          }
          catch (e) {
            throw new Error("Error completing the login process " + e.stack);
          }
        });
      }
    },

    render() {
      return (
        <div id="login-wrapper">
        </div>
      );
    }
  });

  login = ConnectToStores(login, 'SessionStore');
  return new DependencyProvider(login);
};
