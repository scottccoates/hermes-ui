/* eslint-disable import/default */
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

import './assets/images/favicon.ico'; // Tell webpack to load favicon.ico
import './styles/main.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

import log from 'loglevel';

const settingsModule = process.env.SETTINGS_MODULE;

import * as constants from './settings/constants';

const container         = require(`./settings/${settingsModule}`).default;
const containerInstance = container.init();

// https://github.com/pimterry/loglevel#documentation
log.setLevel(containerInstance.get(constants.LOG_LEVEL), false); // false means don't persist this to client storage

const errorLogger = containerInstance.get(constants.ERROR_LOGGER);
errorLogger.init();

const configureStore = containerInstance.get(constants.APP_STORE_CONFIG).dependency;
const store          = configureStore();
// no need for "singleton" param here, appStore is not a function, it's an instance of an object.
// intravenous differentiates between the two.
// "singleton" would mean that the result of a function is used every single time `container.get` is called.
containerInstance.register(constants.APP_STORE, store);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// ok so here's what's going on:
// typically, you need to call store.dispatch(someActionCreator.action());
// our sessionService is special in that it will renew the session token every x min.
// we do this by passing in a param called `keepAliveSessionFunc`. That param must be bound (or have access to our store)
// so that it can dispatch the action.
const sessionActions = containerInstance.get(constants.SESSION_ACTIONS);
sessionActions.resumeSession(sessionActions.resumeSession);

const unSub = store.subscribe(async ()=> {
  unSub();

  const state = store.getState();

  if (state.session.loggedIn) {

    errorLogger.setUser(state.session.meta.email, state.session.meta.email, state.session.meta.name, state.session.meta.nickname);
  }

  const routesInstances = routes.init(containerInstance);

  render(
    <Provider store={store}>
      <Router history={history} routes={routesInstances}/>
    </Provider>, document.getElementById('app')
  );
});
