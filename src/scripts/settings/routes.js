/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import container from './ioc';

import App from '../apps/app-layout/components/app';

import AsyncRouteHandler from '../libs/react-js/routing/async-route-handler';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

export default {
  init(container){
    const AppLayoutComponent = container.get("AppLayoutComponent").dependency;
    const DashboardComponent = container.get("DashboardComponent").dependency;

    const LoginComponent  = container.get("LoginComponent").dependency;
    const LogoutComponent = container.get("LogoutComponent").dependency;

    const AgreementContainerComponent = container.get("AgreementContainerComponent").dependency;
    const CreateAgreementComponent    = container.get("CreateAgreementComponent").dependency;
    const AgreementFormComponent      = container.get("AgreementFormComponent").dependency;

    const SearchResultContainer = container.get("SearchResultContainer").dependency;

    const flux = container.get("AppFlux");

    const Inbox = React.createClass({
      accept() {
      },
      render() {
        let style = {marginBottom: "300px"};
        return (
          <div>
            hi
            <div style={style}>Sup Homie!</div>

            <img src="http://lorempixel.com/800/600/"/>
          </div>
        );
      }
    });

    var routes = (
      <Route handler={App}>

        <Route path="/" name="appLayout" handler={AppLayoutComponent}>
          <Route name="contracts" handler={AgreementContainerComponent}>
            <Route name="create-agreement" path="step_1" handler={CreateAgreementComponent}/>
            <Route name="agreement-form" path="step_2" handler={AgreementFormComponent}/>
          </Route>
          <Route name="inbox" handler={Inbox}/>
          <Route name="dashboard" handler={DashboardComponent}/>
          <Route name="search" handler={SearchResultContainer}/>
          <DefaultRoute handler={Inbox}/>
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
