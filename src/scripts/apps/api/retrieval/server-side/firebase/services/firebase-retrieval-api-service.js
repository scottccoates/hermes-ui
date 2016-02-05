import log from 'loglevel';

import smartViewRetrievalApiService from'./smart-view-firebase-retrieval-api-service';
import agreementRetrievalApiService from'./agreement-firebase-retrieval-api-service';
import agreementTypeRetrievalApiService from'./agreement-type-firebase-retrieval-api-service';
import counterPartyRetrievalApiService from'./counterparty-firebase-retrieval-api-service';
import alertRetrievalApiService from'./alert-firebase-retrieval-api-service';

export default function (firebase) {
  return {
    init(container, store) {
      const promise = new Promise((res, rej)=> {
        const firebaseToken = store.getState().session.user.firebaseData.token;

        firebase.authWithCustomToken(firebaseToken, function (error) {
          if (error) {
            rej(new Error("Error authenticating with firebase: " + error.stack));
          }
          else {
            smartViewRetrievalApiService.init(container, store, firebase);
            agreementRetrievalApiService.init(container, store, firebase);
            agreementTypeRetrievalApiService.init(container, store, firebase);
            counterPartyRetrievalApiService.init(container, store, firebase);
            alertRetrievalApiService.init(container, store, firebase);
            log.info("Firebase authenticated");

            res();
          }
        });
      });

      return promise;
    }
  }
};
