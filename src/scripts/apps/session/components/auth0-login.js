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

    componentWillReceiveProps(nextProps){
      if (nextProps.loggedIn) {
        // I'm not sure if there's a better way to completely reset the history by this point.
        // It'd be bad to be able to click back and go back to the login screen
        this.context.router.transitionTo(this.props.query.nextPath || '/');
      }
    },

    componentDidMount(){
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
      const sessionActions = this.props.flux.getActions('sessionActions');

      auth0Lock.show(lockOptions, async (error, profile, id_token)=> {
        if (error) throw new Error(`Error authenticating: ${id_token}. Inner exception: ${error.stack}`);
        try {
          log.info("Beginning: Log in user: %s", profile.nickname);
          await sessionActions.login(id_token, profile);
          log.info("Completed: Log in user: %s", profile.nickname);
        } catch (e) {
          throw new Error("Error completing the login process " + e.stack);
        }
      });
    },

    onSubmit(event){
      event.preventDefault();
      var validation = this.refs.validation;

      // it's important to remember that validation is async (consider database calls, apis, existence in db, etc).
      validation.validate(valid => {
        const sessionActions = this.props.flux.getActions('sessionActions');
        sessionActions.login(this.state.formData);
      });
    },

    render() {
      return (
        <div id="login-wrapper">
        </div>
      );
    }
  });

  login = ConnectToStores(login, 'sessionStore');
  return new DependencyProvider(login);
};
