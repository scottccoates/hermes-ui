///* jshint -W030 */
//'use strict';
//
//import React from 'react';
//
//import Flummox from 'flummox';
//import { Store } from 'flummox';
//
//import StubRouterContext from 'src/scripts/libs/react-js/testing/router/stub-router-context';
//
//import StubFlummoxContext from 'src/scripts/libs/react-js/testing/flux/stub-flummox-context';
//
//import AppLayout from '../../components/app-layout';
//
//import Container from 'src/scripts/settings/dev-testing';
//
//const {TestUtils} = React.addons;
//
//class SessionStubStore extends Store {
//
//  constructor(flux) {
//    super();
//
//    this.state = {
//      loggedIn: false
//    };
//  }
//}
//
//describe('AppLayout', ()=> {
//  it('renders correct initial height', () => {
//    const authenticatedComponentStub = {get: component => ({dependency: component})};
//    const appLayoutComponent         = AppLayout(authenticatedComponentStub).dependency;
//
//    const storeStubs = {'SessionStore': SessionStubStore};
//    var Subject      = StubRouterContext(StubFlummoxContext(appLayoutComponent, {loading: true}, null, storeStubs));
//
//    // Ithink we'll need to just use FluxComponent: https://github.com/acdlite/flummox/issues/159
//    //const element = TestUtils.renderIntoDocument(<Subject/>);
//    //const height  = TestUtils.findRenderedDOMComponentWithClass(element, "transition-content-wrapper").getDOMNode().style.height;
//    //expect(height).to.equal("500px");
//  });
//});
//
