import config from 'src/scripts/settings/ioc';

import Lock from 'auth0-lock';
import Auth0LoginComponent from 'src/scripts/apps/session/components/auth0-login';
import Auth0AuthService from 'src/scripts/apps/session/services/auth0-auth-service';

import Firebase from 'firebase';
import FirebaseRetrievalRepo from 'src/scripts/apps/api/retrieval/server-side/firebase/repositories/firebase-retrieval-repository';

export default {
  init(){
    const container = config.init();

    container.register("LogLevel", "debug");

    container.register("LoginComponent", Auth0LoginComponent);
    container.register("Auth0ClientID", 'Auth0 client id');
    container.register("Auth0ClientDomain", 'Auth0 client domain');
    container.register("Auth0Lock", Lock);
    container.register("AuthService", Auth0AuthService);

    container.register("Firebase", Firebase);
    container.register("APIRetrievalRepository", FirebaseRetrievalRepo);
    container.register("FirebaseAppUrl", "Firebase App Url");

    Lock.$inject = ["Auth0ClientID", "Auth0ClientDomain"]; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = ["Auth0Lock"];
    Auth0AuthService.$inject    = ["Auth0Lock"];

    Firebase.$inject              = ["FirebaseAppUrl"];
    FirebaseRetrievalRepo.$inject = ["Firebase"];

    return container;
  }
}
