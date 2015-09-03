/* jshint -W030 */
'use strict';
import log from 'loglevel';

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

const sessionActions = containerInstance.get('SessionActions');

store.dispatch(sessionActions.resumeSession());

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
