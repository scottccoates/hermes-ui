'use strict';

import React from 'react';
import Router from 'react-router';

import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import Footer from './footer/footer';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

import AuthenticatedComponent from '../../session/components/authenticated-component';

const {RouteHandler} = Router;

export default function (authenticatedComponentFactory) {

  var component = React.createClass({
    displayName: "AppLayout",
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
      var transitionWrapperHeight         = null;
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
        transitionWrapperHeight         = this.transitionContent.clientHeight + "px";
      }

      const transitionWrapperStyle = {height: transitionWrapperHeight};
      const transitionContentStyle = {opacity: transitionContentWrapperOpacity};

      return (
        <div id="page-wrapper">
          <Sidebar />

          <div id="main-wrapper">
            <Header />

            <div id="content-wrapper">
              <div className="transition-content-wrapper" style={transitionWrapperStyle}>
                <div ref="transitionContent" className="transition-content" style={transitionContentStyle}>
                  <RouteHandler />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
  });

  component = authenticatedComponentFactory.get(component).dependency;

  return new DependencyProvider(component);
};
