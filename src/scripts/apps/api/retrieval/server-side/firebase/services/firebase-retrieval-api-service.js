import log from 'loglevel';

import agreementRetrievalApiService from'./agreement-firebase-retrieval-api-service';

export default function (firebase) {
  return {
    init(container, store) {
      const promise = new Promise((res, rej)=> {
        const firebaseToken = store.getState().session.user.firebaseData.token;

        firebase.authWithCustomToken(firebaseToken, function (error) {
          if (error) rej("Error authenticating with firebase: " + error.stack);

          agreementRetrievalApiService.init(container, store, firebase);
          log.info("Firebase authenticated");

          res();
        });
      });

      return promise;
    }
  }
};
