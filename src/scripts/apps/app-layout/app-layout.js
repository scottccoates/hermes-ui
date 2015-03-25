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

  render() {
    //https://github.com/rackt/react-router/blob/e0a15ebc81d76119935fef27e0ab7d7b024b98fd/examples/animations/app.js
    var name = this.getRoutes().reverse()[0].name;

    return (
        <div id="page-wrapper">
          <Sidebar />
          <div id="main-wrapper">
            <Header />
            <div id="content-wrapper">
              <div className="container">
                <ReactCSSTransitionGroup transitionName="content" transitionLeave={false}>
                  <RouteHandler key={name}/>
                </ReactCSSTransitionGroup>
              </div>
            </div>
            <Footer />
          </div>
        </div>
    );
  }
});

export default AppLayout;
