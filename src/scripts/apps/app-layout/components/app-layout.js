'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import Footer from './footer/footer';

import { connect } from 'react-redux';


import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {

  var appLayout = React.createClass({
    displayName: "AppLayout",
    contextTypes: {
      router: React.PropTypes.func
    },

    setTransitionContent() {
      // accessing refs or DOM from render is not recommended.
      this.transitionContent = ReactDOM.findDOMNode(this.refs.transitionContent);
    },

    componentDidMount() {
      this.setTransitionContent();
    },

    componentDidUpdate() {
      this.setTransitionContent();
    },

    render() {
      // the transitionContent is an un-hindered DOM element, we can use it to measure what the size 'should' be.
      // the transitionWrapper is a DOM element that manually change the height attrs of.

      //var transitionWrapperHeight  = null;
      //var transitionContentOpacity = null;
      //
      //if (this.props.loading) {
      //  transitionContentOpacity = "0";
      //  if (this.transitionContent) {
      //    transitionWrapperHeight = this.transitionContent.clientHeight + "px";
      //  } else {
      //    // this is the first time the page is loading, hence the node is missing
      //    // first time loading async data, we want to ensure the height change is animated
      //    transitionWrapperHeight = "500px";
      //  }
      //}
      //else {
      //  transitionContentOpacity = "1";
      //  transitionWrapperHeight  = this.transitionContent.clientHeight + "px";
      //}

      //const transitionWrapperStyle = {height: transitionWrapperHeight};
      //const transitionContentStyle = {opacity: transitionContentOpacity};
      const transitionWrapperStyle = {};
      const transitionContentStyle = {};

      return (
        <div id="page-wrapper">
          <Sidebar />

          <div id="main-wrapper">
            <Header user={this.props.user}/>

            <div id="content-wrapper">
              <div className="transition-content-wrapper" style={transitionWrapperStyle}>
                <div ref="transitionContent" className="transition-content" style={transitionContentStyle}>
                  {/*
                   https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
                   https://github.com/rackt/react-router/blob/15b05b4f2ca8b4ade5f7378ed1839b752a62babc/examples/passing-props-to-children/app.js
                   */}
                  {React.cloneElement(this.props.children, {user: {token: this.props.token}})}
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      );
    }
  });

  appLayout = connect(x=> x.session)(appLayout);

  return new DependencyProvider(appLayout);
};
