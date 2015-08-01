/* jshint -W030 */
'use strict';
import log from 'loglevel';

import Container from 'build/js/container';

import AppFlux from 'src/scripts/apps/messaging/flux/app-flux';
import Routes from 'src/scripts/settings/routes';

const container = Container.init();

// https://github.com/pimterry/loglevel#documentation
log.setLevel(container.get('LogLevel'), false); // false means don't persist this to client storage

// the appFlux module will use the container (above) to register its actions and stores, it needs to be registered before routes (below)
const appFluxClass = AppFlux.init(container);
const appFlux      = new appFluxClass();
// no need for "singleton" param here, appFlux is not a function, it's an instance of an object.
// intravenous differentiates between the two.

container.register("AppFlux", appFlux);

// retrievalService will listen for events from  appflux
const retrievalService = container.get('RetrievalApiService');

retrievalService.init(appFlux);

const sessionPromise = appFlux.getActions('SessionActions').resumeSession()
  .catch(error => {
    // we should catch this exception, flummox has no way of knowing this unhandled exception is ok.

    // this will happen if we can't resume a session (first time here, logged out, etc). It's ok.
    log.info("session error:", error);
  });

sessionPromise.then(_=> {
  const sessionStore = appFlux.getStore('SessionStore');
  if (sessionStore.state.loggedIn) {
    // wait for the apiReadStore to be ready (it'll take some time because it does wait the session.login action)
    const apiReadStore = appFlux.getStore('ApiReadStore');
    apiReadStore.once('change', _=> {
      // it's important to wait for the apiReadStore. It waits for firebase.authWithCustomToken.
      // Otherwise, things like agreementDetailStore could change before we're listening to it.
      Routes.init(container);
    });
  }
  else {
    Routes.init(container);
  }
});
