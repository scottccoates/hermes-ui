import React from 'react';
import Router  from 'react-router';

const {RouteHandler} = Router;

const App = React.createClass({
  displayName: "App",
  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
});
