import log from 'loglevel';

export default function (firebase) {
  return {
    init(container) {
      const appFlux                = container.get("AppFlux");
      const sessionStore           = appFlux.getStore("sessionStore");
      const agreementRetrievalRepo = container.get("AgreementFirebaseRetrievalRepo");

      var isAuthenticated = false;

      sessionStore.on('change', _=> {

        if (sessionStore.state.loggedIn) {
          const firebaseToken = sessionStore.state.user.firebaseData.token;

          firebase.authWithCustomToken(firebaseToken, function (error, authData) {
            if (error) throw new Error("Error authenticating with firebase: " + error.stack);

            if (!isAuthenticated) {
              agreementRetrievalRepo.init(firebase, sessionStore.state.user);
            }

            isAuthenticated = true;
            log.info("Firebase authenticated");
          });
        } else {
          // the 'change' event can be fired even when we haven't logged in or out
          if (isAuthenticated) {
            agreementRetrievalRepo.close();
            firebase.unauth();
            log.info("Firebase unauthenticated");
          }
        }
      });
    }
  }
};
