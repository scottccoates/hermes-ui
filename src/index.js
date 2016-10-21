/* eslint-disable import/default */
import log from 'loglevel';

const settingsModule = process.env.SETTINGS_MODULE || 'dev';

const container         = require(`./settings/${settingsModule}`).default;
const containerInstance = container.init();

const errorLogger = containerInstance.get('ErrorLogger');
errorLogger.init();

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './assets/images/favicon.ico'; // Tell webpack to load favicon.ico
import './styles/main.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);
