import config from 'src/scripts/settings/ioc';

import Lock from 'auth0-lock';
import Auth0LoginComponent from 'src/scripts/apps/session/components/auth0-login';
import Auth0AuthService from 'src/scripts/apps/session/services/auth0-auth-service';

export default {
  init(){
    const container = config.init();

    container.register("LogLevel", "info"); // prod should probably be set to warning - might need customer to look in console if it gets bad

    container.register("LoginComponent", Auth0LoginComponent);
    container.register("Auth0ClientID", '/* @echo AUTH0_CLIENT_ID */');
    container.register("Auth0ClientDomain", '/* @echo AUTH0_CLIENT_DOMAIN */');
    container.register("Auth0Lock", Lock);
    container.register("AuthService", Auth0AuthService);

    container.register("Firebase", Firebase);
    container.register("APIRetrievalRepository", FirebaseRetrievalRepo);
    container.register("FirebaseAppUrl", "/* @echo FIREBASE_APP_URL */");

    Lock.$inject = ["Auth0ClientID", "Auth0ClientDomain"]; // these are provided in the environment settings files
    Auth0LoginComponent.$inject = ["Auth0Lock"];
    Auth0AuthService.$inject    = ["Auth0Lock"];

    FirebaseRetrievalRepo.$inject          = ["FirebaseAppName", "FirebaseFactory"];

    return container;
  }
}
