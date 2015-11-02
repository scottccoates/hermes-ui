import config from 'src/scripts/settings/ioc';

import Lock from 'auth0-lock';
import Auth0LoginComponent from 'src/scripts/apps/session/components/auth0-login-component';
import Auth0AuthService from 'src/scripts/apps/session/services/auth0-auth-service';

import Dropzone from 'dropzone';

import Firebase from 'firebase';
import FirebaseRetrievalApiService from 'src/scripts/apps/api/retrieval/server-side/firebase/services/firebase-retrieval-api-service';

import ServerSidePersistenceApiService from 'src/scripts/apps/api/persistence/server-side/services/server-side-persistence-api-service';

export default {
  init(){
    const container = config.init();

    container.register("LogLevel", "debug");

    container.register("LoginComponent", Auth0LoginComponent);
    container.register("Auth0ClientID", '/* @echo AUTH0_CLIENT_ID */');
    container.register("Auth0ClientDomain", '/* @echo AUTH0_CLIENT_DOMAIN */');
    container.register("Auth0Lock", Lock);
    container.register("AuthService", Auth0AuthService);

    container.register("Dropzone", Dropzone);

    container.register("Firebase", Firebase);
    container.register("RetrievalApiService", FirebaseRetrievalApiService);
    container.register("FirebaseAppUrl", "/* @echo FIREBASE_APP_URL */");

    container.register("PersistenceApiService", ServerSidePersistenceApiService);
    container.register("PersistenceApiServiceUrl", "/* @echo PERSISTENCE_API_SERVICE_URL */");

    Lock.$inject = ["Auth0ClientID", "Auth0ClientDomain"]; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = ["Auth0Lock"];
    Auth0AuthService.$inject    = ["Auth0Lock"];

    Firebase.$inject                    = ["FirebaseAppUrl"];
    FirebaseRetrievalApiService.$inject = ["Firebase"];

    ServerSidePersistenceApiService.$inject = ['PersistenceApiServiceUrl', 'AppStore'];

    return container;
  }
}
