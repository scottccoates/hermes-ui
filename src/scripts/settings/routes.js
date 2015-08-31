/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import container from './ioc';

import App from '../apps/app-layout/components/app';

import AsyncRouteHandler from '../libs/react-js/routing/async-route-handler';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation, Redirect} = Router;

export default {
  init(container){
    const AppLayoutComponent = container.get("AppLayoutComponent").dependency;
    const DashboardComponent = container.get("DashboardComponent").dependency;

    const LoginComponent  = container.get("LoginComponent").dependency;
    const LogoutComponent = container.get("LogoutComponent").dependency;

    const CreateAgreementComponent = container.get("CreateAgreementComponent").dependency;
    const AgreementFormComponent   = container.get("AgreementFormComponent").dependency;
    const AgreementDetailContainerComponent = container.get("AgreementDetailContainerComponent").dependency;

    const SearchResultContainer = container.get("SearchResultContainer").dependency;

    const flux = container.get("AppFlux");

    var routes = (
      <Route handler={App}>

        <Route path="/" name="appLayout" handler={AppLayoutComponent}>
          <Redirect from="/" to="dashboard"/>

          <Route name="contracts">
            <Route name="createAgreement" path="step_1" handler={CreateAgreementComponent}/>
            <Route name="agreementForm" path="step_2" handler={AgreementFormComponent}/>

            <Route name="agreementDetail" path=":agreementId" handler={AgreementDetailContainerComponent}/>
          </Route>

          <Route name="dashboard" handler={DashboardComponent}/>
          <Route name="search" handler={SearchResultContainer}/>
        </Route>

        <Route name="login" handler={LoginComponent}/>
        <Route name="logout" handler={LogoutComponent}/>
      </Route>
    );

    const router = Router.create({
      routes: routes,
      location: HistoryLocation
    });

    router.run(AsyncRouteHandler.getHandler('app', flux));
  }
};
