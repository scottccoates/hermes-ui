import log from 'loglevel';
import agreementRetrievalRepo from './agreement-client-side-retrieval-repository';

export default function () {
  return {
    init(appFlux) {
      const apiReadStore = appFlux.getStore("ApiReadStore");

      const sessionStore = appFlux.getStore("SessionStore");

      sessionStore.on('change', _=> {

        if (sessionStore.state.loggedIn) {

          if (!apiReadStore.state.readApiReady) {
            agreementRetrievalRepo.init(appFlux);

            setTimeout(_=> {
              // this will signal the routers to continue initializing
              // this needs to be on the nextTick (because the real api service has to wait for authentication results)

              apiReadStore.setReadApiReadyState(true);
              log.info("Client side retrieval repo authenticated");
            });
          }
        }
        else {
          // the 'change' event can be fired even when we haven't logged in or out
          if (apiReadStore.state.readApiReady) {
            agreementRetrievalRepo.close();
            apiReadStore.setReadApiReadyState(false);
            log.info("Client side retrieval repo unauthenticated");
          }
        }
      });
    }
  }
};
