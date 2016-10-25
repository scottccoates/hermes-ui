import React from 'react';

import { connect } from 'react-redux';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

import logoUrl from '../../../../assets/images/medium-logo-no-text.svg'

import log from 'loglevel';

export default function (sessionActions, auth0LockFactory) {
  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);

      this.displayName = 'AuthLoginComponent';
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.loggedIn) {
        this._doLoginTransition();
      }
    }

    componentDidMount() {
      // https://auth0.com/docs/libraries/lock/customization
      // https://auth0.com/docs/libraries/lock/sending-authentication-parameters
      // we cannot omit authParams.scope because we need to pass in appMetadata into our JWT
      const lockOptions = {
        sso: false,
        rememberLastLogin: false,
        closable: false,
        theme: {logo: logoUrl},
        authParams: {scope: 'openid app_metadata'}
      };

      this.lock = auth0LockFactory.get(lockOptions);

      if (this.props.loggedIn) {
        // if they're already logged in, but visiting /login
        this._doLoginTransition();
      }
      else {
        this.lock.on("authenticated", this.handleAuth);
        this.lock.show();
      }
    }

    componentWillUnmount() {
      auth0LockFactory.dispose(this.lock);
    }

    _doLoginTransition() {
      // I'm not sure if there's a better way to completely reset the history by this point.
      // It'd be bad to be able to click back and go back to the login screen
      window.location = this.props.location.query['next-path'] || '/';
    }

    async handleAuth(authResult) {
      const {idToken} = authResult;

      try {
        log.info("Beginning: Log in user: %s", idToken);
        sessionActions.login(idToken, sessionActions.resumeSession);
      }
      catch (e) {
        throw new Error("Error completing the login process " + e.stack);
      }
    }

    render() {
      return (
        <div id="login-wrapper">
        </div>
      );
    }
  }


  return new DependencyProvider(connect(x=> x.session)(Component));
};
