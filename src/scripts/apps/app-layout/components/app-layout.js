'use strict';

import React from 'react';
import ReactAddons from 'react/addons';
import Router from 'react-router';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import Footer from './footer/footer';

const {RouteHandler} = Router;
const ReactCSSTransitionGroup = ReactAddons.addons.CSSTransitionGroup;

const AppLayout = React.createClass({
  mixins: [Router.State],

  getInitialState() {
    return {loading: false};
  },

  render() {
    //https://github.com/rackt/react-router/blob/e0a15ebc81d76119935fef27e0ab7d7b024b98fd/examples/animations/app.js
    const currentRoute = this.getRoutes().reverse()[0];
    this.name = currentRoute.name;
    //this.currentlyLoading = this.state.loading;
    //
    //var loadAsync = currentRoute.handler.loadAsync;
    //if (loadAsync && !this.currentlyLoading) {
    //
    //  this.currentlyLoading = true;
    //
    //  Promise.all(loadAsync()).then(()=> {
    //
    //    this.currentlyLoading = false;
    //    this.setState({loading: false});
    //
    //  });
    //}
    //
    //const style = {"visibility": this.currentlyLoading ? "hidden" : "visible"};

    return (
        <div id="page-wrapper">
          <Sidebar />
          <div id="main-wrapper">
            <Header />
            <div id="content-wrapper">
              <ReactCSSTransitionGroup transitionName="content" transitionLeave={false}>
                <RouteHandler key={this.name}/>
              </ReactCSSTransitionGroup>
            </div>
            <Footer />
          </div>
        </div>
    );
  }
});

export default AppLayout;
