/* eslint-disable import/default */
import log from 'loglevel';

const settingsModule = process.env.SETTINGS_MODULE;

import * as constants from './settings/constants';

const container         = require(`./settings/${settingsModule}`).default;
const containerInstance = container.init();

const errorLogger = containerInstance.get(constants.ERROR_LOGGER);
errorLogger.init();

// https://github.com/pimterry/loglevel#documentation
log.setLevel(containerInstance.get(constants.LOG_LEVEL), false); // false means don't persist this to client storage

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const configureStore = containerInstance.get(constants.APP_STORE_CONFIG).dependency;
const store = configureStore();

import './assets/images/favicon.ico'; // Tell webpack to load favicon.ico
import './styles/main.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);
