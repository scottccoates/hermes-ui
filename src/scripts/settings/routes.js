/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import container from './di';

import AppLayout from 'src/apps/app-layout/components/app-layout';

import AsyncRouteHandler from 'src/libs/react-js/routing/async-route-handler';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

const Dashboard = container.get("Dashboard").componentType;

const MI = container.get("MI").componentType;
const NewMI = container.get("NewMI").componentType;
const MIForm = container.get("MIForm").componentType;

const SearchResultList = container.get("SearchResultList").componentType;

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
    <Route  handler={AppLayout}>

      <Route name="contracts" handler={MI}>
        <Route name="newMI" path="step_1" handler={NewMI}/>
        <Route name="miForm" path="step_2" handler={MIForm}/>
      </Route>

      <Route name="inbox" handler={Inbox}/>
      <Route name="dashboard" handler={Dashboard}/>
      <Route name="search" handler={SearchResultList}/>

      <DefaultRoute handler={Inbox}/>
    </Route>
);

const router = Router.create({
  routes: routes,
  location: HistoryLocation
});

router.run(AsyncRouteHandler.getHandler('app'));

export default {router};
