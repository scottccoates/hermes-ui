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

// retrievalRepo will listen for events from  appflux
const retrievalRepo = container.get('APIRetrievalRepository');
retrievalRepo.init(container);

const sessionPromise = appFlux.getActions('SessionActions').resumeSession()
  .catch(error => {
    // this will happen if we can't resume a session (first time here, logged out, etc). It's ok.
    log.info("session error:", error);
  });

sessionPromise.then(Routes.init.bind(Routes, container));
