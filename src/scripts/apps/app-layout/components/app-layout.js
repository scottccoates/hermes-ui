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
      // the transitionContent is an un-hindered DOM element, we can use it to measure what the size 'should' be.
      // the transitionWrapper is a DOM element that manually change the height attrs of.

      var transitionWrapperHeight  = null;
      var transitionContentOpacity = null;
      var transitionContentNode    = null;

      if (this.props.loading) {
        transitionContentOpacity = "0";
        if (this.transitionContent) {
          transitionWrapperHeight = this.transitionContent.clientHeight + "px";
        }
        else {
          // this is the first time the page is loading, hence the node is missing
          // first time loading async data, we want to ensure the height change is animated
          transitionWrapperHeight = "500px";
        }

        transitionContentNode = (<div>Loading</div>);
      }
      else {
        transitionContentOpacity = "1";
        transitionWrapperHeight  = this.transitionContent.clientHeight + "px";

        transitionContentNode = (<RouteHandler/>);
      }

      const transitionWrapperStyle = {height: transitionWrapperHeight};
      const transitionContentStyle = {opacity: transitionContentOpacity};

      return (
        <div id="page-wrapper">
          <Sidebar />

          <div id="main-wrapper">
            <Header />

            <div id="content-wrapper">
              <div className="transition-content-wrapper" style={transitionWrapperStyle}>
                <div ref="transitionContent" className="transition-content" style={transitionContentStyle}>
                  {transitionContentNode}
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
