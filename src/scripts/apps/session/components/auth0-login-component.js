import React from 'react';

import { connect } from 'react-redux';

import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';

import logoUrl from '../../../../assets/images/medium-logo-no-text.svg'

import log from 'loglevel';

export default function (sessionActions, auth0Js, auth0LockFactory) {
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

      // tokens are not passed into the hash because we're not using a redirect mode. Right now the only reason
      // auth info would be int he has is if we're impersonating someone.
      const authInfo = auth0Js.parseHash(window.location.hash);
      const idToken  = authInfo && authInfo.id_token;
      this.lock      = auth0LockFactory.get(lockOptions);

      if (idToken) {

        if (this.props.loggedIn) {
          // log out initial user  first
          try {
            const nickname = this.props.user.nickname;
            log.info("Logging out previous user: %s", nickname);
            this.transitionTo('/logout', {}, {'next-path': window.location.toString()});
          }
          catch (e) {
            throw new Error("Error completing the impersonate process " + e.stack);
          }
        }
        else {
          auth0Js.getProfile(idToken, (error, profile)=> {

            if (error) throw new Error(`Error authenticating: ${idToken}. Inner exception: ${error.stack}`);

            try {
              log.info("Beginning: Impersonate user: %s", profile.nickname);
              sessionActions.login(idToken, profile, sessionActions.resumeSession);
            }
            catch (e) {
              throw new Error("Error completing the impersonate process " + e.stack);
            }
          });
        }
      }
      else {
        if (this.props.loggedIn) {
          // if they're already logged in, but visiting /login
          this._doLoginTransition();
        }
        else {

          this.lock.show((error, meta, idToken)=> {
            if (error) {
              if (error.status && error.status != 401) {
                throw new Error(`Error authenticating: ${idToken}. Inner exception: ${error.stack}`);
              }
            }
            else {
              try {
                log.info("Beginning: Log in user: %s", meta.nickname);
                sessionActions.login(idToken, meta, sessionActions.resumeSession);
              }
              catch (e) {
                throw new Error("Error completing the login process " + e.stack);
              }
            }
          });
        }
      }
    }

    _doLoginTransition() {
      // I'm not sure if there's a better way to completely reset the history by this point.
      // It'd be bad to be able to click back and go back to the login screen
      window.location = this.props.location.query['next-path'] || '/';
    }

    render() {
      return (
        <div id="login-wrapper">
        </div>
      );
    }

    componentWillUnmount() {
      auth0LockFactory.dispose(this.lock);
    }
  }


  return new DependencyProvider(connect(x=> x.session)(Component));
};
