import React from 'react';
import Router  from 'react-router';
import { Provider } from 'react-redux';

const {RouteHandler} = Router;

// https://github.com/rackt/redux/blob/master/examples/real-world/index.js
// http://rackt.github.io/redux/docs/basics/UsageWithReact.html
const App = React.createClass({
  displayName: "App",
  render() {
    debugger
    return (
      <Provider store={store}>
        {() =><RouteHandler {...this.props}/>}
      </Provider>
    );
  }
});
