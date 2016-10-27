import config from './common';

import DependencyProvider from '../scripts/libs/dependency-injection/utils/dependency-provider';

import * as constants from './constants';

import LoglevelErrorLogger from '../scripts/libs/js-utils/logging/loglevel-error-logger';

import devStore from '../scripts/apps/app-layout/messaging/redux/dev-store';

import Auth0Js from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import Auth0LoginComponent from '../scripts/apps/session/components/auth0-login-component';
import Auth0AuthService from '../scripts/apps/session/services/auth0-auth-service';

import Firebase from 'firebase';
import FirebaseRetrievalApiService from '../scripts/apps/api/retrieval/server-side/firebase/services/firebase-retrieval-api-service';

import FileUpload from '../scripts/libs/react-js/components/file-upload';

import Dropzone from 'dropzone';

export default {
  init(){
    const container = config.init();

    // -- REGISTRATION
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

    container.register("Firebase", Firebase);
    container.register("FirebaseAppUrl", "Firebase App Url");
    container.register("FirebaseApiKey", "Firebase Api Key");
    container.register(constants.RETRIEVAL_API_SERVICE, FirebaseRetrievalApiService);

    container.register(constants.FILE_UPLOAD, FileUpload);

    container.register("Dropzone", Dropzone);

    container.register(constants.PERSISTENCE_API_SERVICE_URL, "http://127.0.0.1:8000/api");

    // -- DEPENDENCIES
    Auth0Js.$inject             = ['Auth0Config']; // these are provided in the environment settings files
    Auth0Lock.$inject           = ['Auth0ClientID', 'Auth0ClientDomain']; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = [constants.SESSION_ACTIONS, 'Auth0Lock!']; //! means 'factory' - in the component we're going to use .get to provide more ctor params
    Auth0AuthService.$inject    = ['Auth0Js'];

    FirebaseRetrievalApiService.$inject = ['Firebase', 'FirebaseAppUrl', 'FirebaseApiKey'];

    FileUpload.$inject = ["Dropzone!"]; //! means 'factory' - in the component we're going to use .get to provide more ctor params

    return container;
  }
};
