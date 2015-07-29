import log from 'loglevel';

import agreementRetrievalRepo from'./agreement-firebase-retrieval-repository';

export default function (firebase) {
  return {
    init(appFlux) {
      const apiReadStore = appFlux.getStore("ApiReadStore");
      const sessionStore = appFlux.getStore("SessionStore");

      sessionStore.on('change', _=> {
        // the 'change' event can be fired even when we haven't logged in or out.
        // It could happen if a logged-out user visits the site. This is because we call sessionActions.resume
        // and if that fails (expiration, logged out, etc), then sessionStore.onLoginFailed is called

        if (sessionStore.state.loggedIn) {
          const firebaseToken = sessionStore.state.user.firebaseData.token;

          firebase.authWithCustomToken(firebaseToken, function (error, authData) {
            if (error) throw new Error("Error authenticating with firebase: " + error.stack);

            if (!apiReadStore.state.readApiReady) {
              // the session store could change for many reasons (change of name, profile pic, etc).
              // we don't want to run this code everytime something bland happens. we only care about logging in/out
              agreementRetrievalRepo.init(appFlux, firebase, sessionStore.state.user);

              // this will signal the routers to continue initializing
              apiReadStore.setReadApiReadyState(true);

              log.info("Firebase authenticated");
            }
          });
        }
        else {
          if (apiReadStore.state.readApiReady) {
            agreementRetrievalRepo.close();
            firebase.unauth();
            apiReadStore.setReadApiReadyState(false);
            log.info("Firebase unauthenticated");
          }
        }
      });
    }
  }
};
