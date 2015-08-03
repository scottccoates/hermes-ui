import log from 'loglevel';

import agreementRetrievalRepo from'./agreement-firebase-retrieval-api-service';

export default function (firebase) {
  return {
    init(appFlux) {
      const promise = new Promise((res, rej)=> {
        const sessionStore  = appFlux.getStore("SessionStore");
        const firebaseToken = sessionStore.state.user.firebaseData.token;

        firebase.authWithCustomToken(firebaseToken, function (error) {
          if (error) rej("Error authenticating with firebase: " + error.stack);

          // the session store could change for many reasons (change of name, profile pic, etc).
          // we don't want to run this code everytime something bland happens. we only care about logging in/out
          agreementRetrievalRepo.init(appFlux, firebase);
          log.info("Firebase authenticated");

          res();
        });
      });

      return promise;
    }
  }
};
