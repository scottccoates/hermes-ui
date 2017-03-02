import log from 'loglevel';

import smartViewRetrievalApiService from'./smart-view-firebase-retrieval-api-service';
import agreementRetrievalApiService from'./agreement-firebase-retrieval-api-service';
import agreementTypeRetrievalApiService from'./agreement-type-firebase-retrieval-api-service';
import counterPartyRetrievalApiService from'./counterparty-firebase-retrieval-api-service';
import alertRetrievalApiService from'./alert-firebase-retrieval-api-service';
import userRetrievalApiService from'./user-firebase-retrieval-api-service';

export default function (firebase, firebaseAppUrl, firebaseApiKey) {
  return {
    async init(container, store) {

      try {
        // if we start using firebase in multiple parts of the app, we should put this init logic in the main entry point of this app
        firebase.initializeApp({databaseURL: firebaseAppUrl, apiKey: firebaseApiKeyd});

        const firebaseToken = store.getState().session.meta.firebaseData.token;
        await firebase.auth().signInWithCustomToken(firebaseToken);

        smartViewRetrievalApiService.init(container, store, firebase);
        agreementRetrievalApiService.init(container, store, firebase);
        agreementTypeRetrievalApiService.init(container, store, firebase);
        counterPartyRetrievalApiService.init(container, store, firebase);
        alertRetrievalApiService.init(container, store, firebase);
        userRetrievalApiService.init(container, store, firebase);

        log.info("Firebase authenticated");
      }
      catch (error) {
        throw new Error("Error authenticating with firebase: " + (error.stack || error));
      }
    }
  };
}
