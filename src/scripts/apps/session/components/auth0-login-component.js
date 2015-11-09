import React from 'react';

import { connect } from 'react-redux';

import { Navigation } from 'react-router';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import log from 'loglevel';

export default function (sessionActions, auth0Lock) {

  var login = React.createClass({
    displayName: "AuthLogin",

    mixins: [Navigation],

    _doLoginTransition(){
      // I'm not sure if there's a better way to completely reset the history by this point.
      // It'd be bad to be able to click back and go back to the login screen
      window.location = this.props.location.query['next-path'] || '/';
    },

    componentWillReceiveProps(nextProps){
      if (nextProps.loggedIn) {
        this._doLoginTransition();
      }
    },

    componentDidMount(){
      // tokens are not passed into the hash because we're not using a redirect mode. Right now the only reason
      // auth info would be int he has is if we're impersonating someone.
      const authInfo = auth0Lock.$auth0.parseHash(window.location.hash);
      const idToken  = authInfo && authInfo.id_token;
      const props    = this.props;

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
          auth0Lock.$auth0.getProfile(idToken, (error, profile)=> {

            if (error) throw new Error(`Error authenticating: ${idToken}. Inner exception: ${error.stack}`);

            try {
              log.info("Beginning: Impersonate user: %s", profile.nickname);
              props.login(idToken, profile, props.resumeSession);
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
          // https://auth0.com/docs/libraries/lock/customization
          // https://auth0.com/docs/libraries/lock/sending-authentication-parameters
          // we can omit authParams.scope because we don't actually care about storing anything in the token.
          const lockOptions = {
            sso: false,
            rememberLastLogin: false,
            closable: false,
            icon: '/assets/images/medium-logo-no-text.svg',
            authParams: {scope: 'openid app_metadata'}
          };

          auth0Lock.show(lockOptions, (error, profile, idToken)=> {
            if (error) {
              if (error.status && error.status != 401) {
                throw new Error(`Error authenticating: ${idToken}. Inner exception: ${error.stack}`);
              }
            }
            else {
              try {
                log.info("Beginning: Log in user: %s", profile.nickname);
                props.login(idToken, profile, props.resumeSession);
              }
              catch (e) {
                throw new Error("Error completing the login process " + e.stack);
              }
            }
          });
        }
      }
    },

    render() {
      return (
        <div id="login-wrapper">
        </div>
      );
    }
  });

  login = connect(x=> x.session, sessionActions)(login);

  return new DependencyProvider(login);
};
