/* jshint -W030 */
'use strict';
import log from 'loglevel';

import { bindActionCreators } from 'redux';

import container from 'build/js/container';

import routes from 'src/scripts/settings/routes';

const containerInstance = container.init();

// https://github.com/pimterry/loglevel#documentation
log.setLevel(containerInstance.get('LogLevel'), false); // false means don't persist this to client storage

import appStore from 'src/scripts/apps/messaging/redux/store';

const store = appStore.init(containerInstance);

// no need for "singleton" param here, appStore is not a function, it's an instance of an object.
// intravenous differentiates between the two.
// "singleton" would mean that the result of a function is used every single time `container.get` is called.
containerInstance.register("AppStore", store);

// ok so here's what's going on:
// typically, you need to call store.dispatch(someActionCreator.action());
// our sessionService is special in that it will renew the session token every x min.
// we do this by passing in a param called `keepAliveSessionFunc`. That param must be bound (or have access to our store)
// so that it can dispatch the action.
// http://rackt.github.io/redux/docs/api/bindActionCreators.html
const sessionActions = bindActionCreators(containerInstance.get('SessionActions'), store.dispatch);
sessionActions.resumeSession(sessionActions.resumeSession);

const unSub = store.subscribe(async _=> {
  unSub();
  debugger
  const state = store.getState();

  if (state.session.loggedIn) {

    // retrievalService will listen for events from the store
    const retrievalService = containerInstance.get('RetrievalApiService');

    try {
      await retrievalService.init(store);
    }
    catch (error) {
      throw new Error(`Error initializing retrieval api service: Inner exception: ${error.stack}`);
    }
  }

  routes.init(containerInstance);
});
