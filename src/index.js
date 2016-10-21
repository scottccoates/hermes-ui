/* eslint-disable import/default */

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




import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';




const configureStore = containerInstance.get(constants.APP_STORE_CONFIG).dependency;
const store = configureStore();
// no need for "singleton" param here, appStore is not a function, it's an instance of an object.
// intravenous differentiates between the two.
// "singleton" would mean that the result of a function is used every single time `container.get` is called.
containerInstance.register(constants.APP_STORE, store);







const unSub = store.subscribe(async _=> {
  unSub();
  const state = store.getState();

  if (state.session.loggedIn) {

    errorLogger.setUser(state.session.meta.email, state.session.meta.email, state.session.meta.name, state.session.meta.nickname);

  }

  routes.init(containerInstance);
});








import { syncHistoryWithStore } from 'react-router-redux';


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);
