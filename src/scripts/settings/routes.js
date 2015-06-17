/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import Flux from '../apps/messaging/flux/app-flux';

import container from './di';

import AppLayout from '../apps/app-layout/components/app-layout';

import AsyncRouteHandler from '../libs/react-js/routing/async-route-handler';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

const DashboardComponent = container.get("DashboardComponent").dependency;

const ManagementItemComponent       = container.get("ManagementItemComponent").dependency;
const CreateManagementItemComponent = container.get("CreateManagementItemComponent").dependency;
const ManagementItemFormComponent   = container.get("ManagementItemFormComponent").dependency;

const SearchResultList = container.get("SearchResultList").dependency;

const flux = new Flux();

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
  <Route handler={AppLayout}>

    <Route name="contracts" handler={ManagementItemComponent}>
      <Route name="createMI" path="step_1" handler={CreateManagementItemComponent}/>
      <Route name="miForm" path="step_2" handler={ManagementItemFormComponent}/>
    </Route>

    <Route name="inbox" handler={Inbox}/>
    <Route name="dashboard" handler={DashboardComponent}/>
    <Route name="search" handler={SearchResultList}/>

    <DefaultRoute handler={Inbox}/>
  </Route>
);

const router = Router.create({
  routes: routes,
  location: HistoryLocation
});

router.run(AsyncRouteHandler.getHandler('app', flux));

export default {router};
