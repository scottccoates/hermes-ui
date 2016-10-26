import React from 'react';
import { Route, IndexRoute } from 'react-router';

import * as constants from './settings/constants';

import HomePage from './components/HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default {
  init(container){
    const AppLayoutComponent = container.get(constants.APP_LAYOUT_COMPONENT).dependency;
    const LoginComponent     = container.get(constants.LOGIN_COMPONENT).dependency;

    const store = container.get(constants.APP_STORE);

    function requireAuth(nextState, replace) {
      if (!store.getState().session.loggedIn) {
        replace({
          pathname: '/login',
          state: {'next-path': nextState.location.pathname}
        });
      }
    }

    return (
      [ // use array for multiple adjacent routes,  https://github.com/ReactTraining/react-router/issues/193#issuecomment-51977965
        <Route path='/' component={AppLayoutComponent} onEnter={requireAuth}>
          <Route path="fuel-savings" component={FuelSavingsPage}/>
          <Route path="about" component={AboutPage}/>
        </Route>,
        <Route path='login' component={LoginComponent}/>
      ]
    );
  }
};
