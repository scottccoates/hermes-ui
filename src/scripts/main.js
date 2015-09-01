/* jshint -W030 */
'use strict';
import log from 'loglevel';

import Container from 'build/js/container';

import AppFlux from 'src/scripts/apps/messaging/flux/app-flux';
import Routes from 'src/scripts/settings/routes';

const container = Container.init();

// https://github.com/pimterry/loglevel#documentation
log.setLevel(container.get('LogLevel'), false); // false means don't persist this to client storage

import {configureStore} from 'src/scripts/apps/messaging/redux/store';

const store = configureStore();

const sessionActions = container.get('SessionActions');

store.dispatch(sessionActions.resumeSession());

//// the appFlux module will use the container (above) to register its actions and stores, it needs to be registered before routes (below)
//const appFluxClass = AppFlux.init(container);
//const appFlux      = new appFluxClass();
//// no need for "singleton" param here, appFlux is not a function, it's an instance of an object.
//// intravenous differentiates between the two.
//
//container.register("AppFlux", appFlux);
//
//const sessionPromise = appFlux.getActions('SessionActions').resumeSession()
//  .catch(error => {
//    // we should catch this exception, flummox has no way of knowing this unhandled exception is ok.
//
//    // this will happen if we can't resume a session (first time here, logged out, etc). It's ok.
//    log.info("session error:", error);
//  });
//
//sessionPromise.then(async _=> {
//  const sessionStore = appFlux.getStore('SessionStore');
//
//  if (sessionStore.state.loggedIn) {
//
//    // retrievalService will listen for events from  appflux
//    const retrievalService = container.get('RetrievalApiService');
//
//    try {
//      await retrievalService.init(appFlux);
//    }
//    catch (error) {
//      throw new Error(`Error initializing retrieval api service: Inner exception: ${error.stack}`);
//    }
//  }
//
//  Routes.init(container);
//});
