import config from './common';

import DependencyProvider from '../scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from './constants';

import LoglevelErrorLogger from '../scripts/libs/js-utils/logging/loglevel-error-logger';

import devStore from '../scripts/apps/app-layout/messaging/redux/dev-store';

import Lock from 'auth0-lock';
import Auth0LoginComponent from '../scripts/apps/session/components/auth0-login-component';
import Auth0AuthService from '../scripts/apps/session/services/auth0-auth-service';

export default {
  init(){
    const container = config.init();

    container.register(constants.LOG_LEVEL, "debug");

    container.register(constants.ERROR_LOGGER, LoglevelErrorLogger);

    container.register(constants.APP_STORE_CONFIG, new DependencyProvider(devStore));

    container.register(constants.LOGIN_COMPONENT, Auth0LoginComponent);
    container.register('Auth0ClientID', 'Auth0 client id');
    container.register('Auth0ClientDomain', 'Auth0 client domain');
    container.register('Auth0Lock', Lock);
    container.register(constants.AUTH_SERVICE, Auth0AuthService);

    Lock.$inject                = ['Auth0ClientID', 'Auth0ClientDomain']; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = [constants.SESSION_ACTIONS, 'Auth0Lock'];
    Auth0AuthService.$inject    = ['Auth0Lock'];

    return container;
  }
};
