'use strict';

import React from 'react';
import Router from 'react-router';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import Footer from './footer/footer';

const {RouteHandler} = Router;

const AppLayout = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  setTransitionContent() {
    // accessing refs or DOM from render is not recommended.
    this.transitionContent = React.findDOMNode(this.refs.transitionContent);
  },

  componentDidMount() {
    this.setTransitionContent();
  },

  componentDidUpdate() {
    this.setTransitionContent();
  },

  render() {
    //https://github.com/rackt/react-router/blob/bf89168acb30b6dc9b0244360bcbac5081cf6b38/examples/animations/app.js
    const name = this.context.router.getCurrentPath();

    var transitionWrapperHeight = null;
    var transitionContentWrapperOpacity = null;

    if (this.props.loading) {
      transitionContentWrapperOpacity = "0";
      if (this.transitionContent) {
        transitionWrapperHeight = this.transitionContent.clientHeight + "px";
      } else {
        // this is the first time the page is loading, hence the node is missing
        // first time loading async data, we want to ensure the height change is animated
        transitionWrapperHeight = "500px";
      }
    }
    else {
      transitionContentWrapperOpacity = "1";
      transitionWrapperHeight = this.transitionContent.clientHeight + "px";
    }

    const transitionWrapperStyle = {height: transitionWrapperHeight};

    const transitionContentStyle = {opacity: transitionContentWrapperOpacity};
    const transitionContent = (
      <div ref="transitionContent" className="transition-content" key={name}
           style={transitionContentStyle}>
        <RouteHandler />
      </div>
    );

    return (
      <div id="page-wrapper">
        <Sidebar />

        <div id="main-wrapper">
          <Header />

          <div id="content-wrapper">
            <div className="transition-content-wrapper" style={transitionWrapperStyle}>
              {transitionContent}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
});

export default AppLayout;
