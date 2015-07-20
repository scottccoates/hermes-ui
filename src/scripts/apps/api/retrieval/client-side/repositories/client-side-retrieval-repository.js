import log from 'loglevel';
import agreementRetrievalRepo from './agreement-client-side-retrieval-repository';

export default function () {
  return {
    init(container) {
      const appFlux      = container.get("AppFlux");
      const sessionStore = appFlux.getStore("sessionStore");

      var isAuthenticated = false;

      sessionStore.on('change', _=> {

        if (sessionStore.state.loggedIn) {

          if (!isAuthenticated) {
            agreementRetrievalRepo.init(appFlux);
          }

          isAuthenticated = true;
          log.info("Client side retrieval repo authenticated");
        } else {
          // the 'change' event can be fired even when we haven't logged in or out
          if (isAuthenticated) {
            agreementRetrievalRepo.close();
            isAuthenticated = false;
            log.info("Client side retrieval repo unauthenticated");
          }
        }
      });
    }
  }
};
