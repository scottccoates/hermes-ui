// http://jspm.io/0.17-beta-guide/hot-reloading.html
import 'systemjs-hot-reloader/default-listener'

import config from 'src/scripts/settings/ioc';

import Lock from 'auth0-lock';
import Auth0LoginComponent from 'src/scripts/apps/session/components/auth0-login-component';
import Auth0AuthService from 'src/scripts/apps/session/services/auth0-auth-service';

import Dropzone from 'dropzone';

import Firebase from 'firebase';
import FirebaseRetrievalApiService from 'src/scripts/apps/api/retrieval/server-side/firebase/services/firebase-retrieval-api-service';

import ServerSidePersistenceApiService from 'src/scripts/apps/api/persistence/server-side/services/server-side-persistence-api-service';

import LoglevelErrorLogger from 'src/scripts/libs/js-utils/logging/loglevel-error-logger';

export default {
  init(){
    const container = config.init();

    container.register("LogLevel", "debug");

    container.register("LoginComponent", Auth0LoginComponent);
    container.register("Auth0ClientID", 'Auth0 client id');
    container.register("Auth0ClientDomain", 'Auth0 client domain');
    container.register("Auth0Lock", Lock);
    container.register("AuthService", Auth0AuthService);

    container.register("Dropzone", Dropzone);

    container.register("Firebase", Firebase);
    container.register("RetrievalApiService", FirebaseRetrievalApiService);
    container.register("FirebaseAppUrl", "Firebase App Url");

    container.register("PersistenceApiService", ServerSidePersistenceApiService);
    container.register("PersistenceApiServiceUrl", "http://127.0.0.1:8000/api");

    container.register("ErrorLogger", LoglevelErrorLogger);

    container.register("StripeApiKey", 'Stripe API Key');

    Lock.$inject                = ["Auth0ClientID", "Auth0ClientDomain"]; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = ['SessionActions', "Auth0Lock"];
    Auth0AuthService.$inject    = ["Auth0Lock"];

    Firebase.$inject                    = ["FirebaseAppUrl"];
    FirebaseRetrievalApiService.$inject = ["Firebase"];

    ServerSidePersistenceApiService.$inject = ['PersistenceApiServiceUrl', 'AppStore'];
    return container;
  }
}
