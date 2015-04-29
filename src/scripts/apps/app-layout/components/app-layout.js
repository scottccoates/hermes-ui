'use strict';

import React from 'react';
import ReactAddons from 'react/addons';
import Router from 'react-router';
import Reflux from 'reflux';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import Footer from './footer/footer';

const {RouteHandler} = Router;
const ReactCSSTransitionGroup = ReactAddons.addons.CSSTransitionGroup;

const AppLayout = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    //https://github.com/rackt/react-router/blob/bf89168acb30b6dc9b0244360bcbac5081cf6b38/examples/animations/app.js
    const name = this.context.router.getCurrentPath();

    const style = {"visibility": this.props.loading ? "hidden" : "visible"};

    console.log('style', style);

    return (
      <div id="page-wrapper">
        <Sidebar />

        <div id="main-wrapper">
          <Header />

          <div id="content-wrapper">

            <ReactCSSTransitionGroup transitionName="content" transitionLeave={false}>
              <div style={style}>
                <RouteHandler key={name}/>
              </div>
            </ReactCSSTransitionGroup>

          </div>

          <Footer />
        </div>
      </div>
    );
  }
});

export default AppLayout;
