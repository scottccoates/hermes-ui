/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import AppLayout from 'src/app/app-layout/app-layout';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
var {DefaultRoute, Route} = Router;

var Inbox = React.createClass({

  render: function () {
    return (
        <div>
          hi
        </div>
    );
  }
});

var routes = (
    <Route  handler={AppLayout}>
      <Route name="inbox" handler={Inbox}/>
      <DefaultRoute handler={Inbox}/>
    </Route>
);

export function init() {
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
  });
}
