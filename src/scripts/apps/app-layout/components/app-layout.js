import React, { PropTypes } from 'react';
import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider.js';

import {connect} from 'react-redux';

export default function (sidebarComponent, headerComponent) {

  const Sidebar = sidebarComponent.dependency;
  const Header  = headerComponent.dependency;

  class Component extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.displayName = 'AppLayoutContainer';
    }

    render() {
      return (
        <div id="page-wrapper">
          <Sidebar userSmartViews={this.props.userSmartViews}/>

          <div id="main-wrapper">
            <Header user={this.props.user}/>

            <div id="content-wrapper">
              {this.props.children}
            </div>
          </div>
        </div>
      );
    }
  }

  Component.propTypes = {
    children: PropTypes.element,
    userSmartViews: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  };

  function extracted(state) {
    return {
      userSmartViews: state.userSmartViews || {smartViews: []/* todo remove me */},
      user: state.userInfo || {identity: {}/* todo remove me */},
    };
  }

  return new DependencyProvider(connect(extracted)(Component));
}

//
//import React from 'react';
//import ReactDOM from 'react-dom';
//import Router from 'react-router';
//
//import { connect } from 'react-redux';
//
//import DependencyProvider from '../../../libs/dependency-injection/utils/dependency-provider';
//
//export default function (sidebarComponent, headerComponent) {
//  const Sidebar = sidebarComponent.dependency;
//  const Header  = headerComponent.dependency;
//
//  var appLayout = React.createClass({
//    displayName: "AppLayout",
//
//    render() {
//
//      return (
//        <div id="page-wrapper">
//          <Sidebar />
//
//          <div id="main-wrapper">
//            <Header user={this.props.user}/>
//
//            <div id="content-wrapper">
//              {/*
//               https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
//               https://github.com/rackt/react-router/blob/15b05b4f2ca8b4ade5f7378ed1839b752a62babc/examples/passing-props-to-children/app.js
//               */}
//              {React.cloneElement(this.props.children, {loginMeta: {token: this.props.session.token}})}
//            </div>
//            <Footer/>
//          </div>
//        </div>
//      );
//    }
//  });
//
//  function extracted(state) {
//    return {
//      session: state.session, user: state.userInfo
//    };
//  }
//
//  appLayout = connect(extracted)(appLayout);
//
//  return new DependencyProvider(appLayout);
//};
