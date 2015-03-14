/* jshint -W030 */
'use strict';

import React from 'react';
import Router  from 'react-router';

import AppLayout from 'src/app/app-layout/app-layout';
import FileUploader from 'src/app/components/file-uploader';

import NewMI from 'src/app/management-item/new/new-management-item';

// Named exports only work for es6, react-router uses common. So we have to use Destructuring instead.
const {DefaultRoute, Route, HistoryLocation} = Router;

const Inbox = React.createClass({
  accept: function () {
  },
  render: function () {
    return (
        <div>
          hi
          <FileUploader accept={this.accept} url="test/test" className="inbox-file-upload dropzone">
            Sup Homie!
          </FileUploader>
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
