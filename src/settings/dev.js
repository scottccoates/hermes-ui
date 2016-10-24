import config from './common';

import DependencyProvider from '../scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from './constants';

import LoglevelErrorLogger from '../scripts/libs/js-utils/logging/loglevel-error-logger';

import devStore from '../scripts/apps/app-layout/messaging/redux/dev-store';

import Auth0Js from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import Auth0LoginComponent from '../scripts/apps/session/components/auth0-login-component';
import Auth0AuthService from '../scripts/apps/session/services/auth0-auth-service';

export default {
  init(){
    const container = config.init();

    container.register(constants.LOG_LEVEL, "debug");

    container.register(constants.ERROR_LOGGER, LoglevelErrorLogger);

    container.register(constants.APP_STORE_CONFIG, new DependencyProvider(devStore));

    container.register(constants.LOGIN_COMPONENT, Auth0LoginComponent);
    const auth0ClientId     = 'Auth0 client id';
    const auth0ClientDomain = 'Auth0 client domain';
    container.register("Auth0ClientID", auth0ClientId);
    container.register("Auth0ClientDomain", auth0ClientDomain);
    container.register('Auth0Config', {clientID: auth0ClientId, domain: auth0ClientDomain});
    container.register('Auth0Js', Auth0Js);
    container.register('Auth0Lock', Auth0Lock);
    container.register(constants.AUTH_SERVICE, Auth0AuthService);

    Auth0Js.$inject             = ['Auth0Config']; // these are provided in the environment settings files
    Auth0Lock.$inject           = ['Auth0ClientID', 'Auth0ClientDomain']; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = [constants.SESSION_ACTIONS, 'Auth0Js', 'Auth0Lock'];
    Auth0AuthService.$inject    = ['Auth0Lock'];

    debugger
    container.get('Auth0Js');
    return container;
  }
};
