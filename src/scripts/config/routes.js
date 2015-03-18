/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import container from './di';

import AppLayout from 'src/app/app-layout/app-layout';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

const NewMI = container.get("NewMI").componentType;

const Inbox = React.createClass({
  accept: function () {
  },
  render: function () {
    return (
        <div>
          hi
          Sup Homie!
        </div>
    );
  }
});

var routes = (
    <Route  handler={AppLayout}>
      <Route name="inbox" handler={Inbox}/>
      <Route name="new" handler={NewMI}/>
      <DefaultRoute handler={Inbox}/>
    </Route>
);

export function init() {
  Router.run(routes, HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });
}
