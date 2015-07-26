import log from 'loglevel';

import agreementRetrievalRepo from'./agreement-firebase-retrieval-repository';

export default function (firebase) {
  return {
    init(container) {
      const appFlux      = container.get("AppFlux");
      const sessionStore = appFlux.getStore("SessionStore");

      var isAuthenticated = false;

      sessionStore.on('change', _=> {
        // the 'change' event can be fired even when we haven't logged in or out.
        // It could happen if a logged-out user visits the site. This is because we call sessionActions.resume
        // and if that fails (expiration, logged out, etc), then sessionStore.onLoginFailed is called

        if (sessionStore.state.loggedIn) {
          const firebaseToken = sessionStore.state.user.firebaseData.token;

          firebase.authWithCustomToken(firebaseToken, function (error, authData) {
            if (error) throw new Error("Error authenticating with firebase: " + error.stack);

            if (!isAuthenticated) {
              agreementRetrievalRepo.init(appFlux, firebase, sessionStore.state.user);
            }

            isAuthenticated = true;
            log.info("Firebase authenticated");
          });
        } else {
          if (isAuthenticated) {
            agreementRetrievalRepo.close();
            firebase.unauth();
            isAuthenticated = false;
            log.info("Firebase unauthenticated");
          }
        }
      });
    }
  }
};
