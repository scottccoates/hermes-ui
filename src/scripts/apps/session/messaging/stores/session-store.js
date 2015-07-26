import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  const defaultState = {
    loggingIn: false,
    loggedIn: false,
    token: null,
    user: null,
    errorMessage: null
  };

  class SessionStore extends Store {

    constructor(flux) {
      super();

      const sessionActions = flux.getActionIds('SessionActions');
      this.registerAsync(sessionActions.login, this.onLoginBegan, this._saveUserState, this.onLoginFailed);
      this.registerAsync(sessionActions.resumeSession, null, this._saveUserState, this.onSessionResumeFailed);
      this.registerAsync(sessionActions.logout, this.onSessionEnded);

      this.state = defaultState;
    }

    _saveUserState(loginInformation) {
      this.setState({
        token: loginInformation.token,
        user: loginInformation.user,
        loggingIn: false,
        loggedIn: true
      });
    }

    onLoginBegan() {
      this.setState({loggingIn: true});
    }

    onLoginFailed(reason) {
      this.setState({errorMessage: reason, loggingIn: false, loggedIn: false});
    }

    onSessionResumeFailed(reason) {
      this.setState({errorMessage: reason, loggingIn: false, loggedIn: false});
    }

    onSessionEnded() {
      this.replaceState(defaultState);
    }
  }

  return new DependencyProvider(SessionStore);
}
