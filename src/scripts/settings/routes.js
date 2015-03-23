/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import container from './di';

import AppLayout from 'src/apps/app-layout/app-layout';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

const MI = container.get("MI").componentType;
const NewMI = container.get("NewMI").componentType;
const MIForm = container.get("MIForm").componentType;

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
        <Route name="MIForm" path="step_2" handler={MIForm}/>
      </Route>
      <Route name="inbox" handler={Inbox}/>
      <Route name="new" handler={NewMI}/>
      <Route name="form" handler={MIForm}/>


      <DefaultRoute handler={Inbox}/>
    </Route>
);

export function init() {
  Router.run(routes, HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });
}
