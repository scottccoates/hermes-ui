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

    return (
      <Route path="/" component={AppLayoutComponent}>
        <IndexRoute component={HomePage}/>
        <Route path="fuel-savings" component={FuelSavingsPage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    );
  }
};
