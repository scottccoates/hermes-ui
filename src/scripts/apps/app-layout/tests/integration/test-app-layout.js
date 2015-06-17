/* jshint -W030 */
'use strict';

import React from 'react/addons';

import StubRouterContext from '../../../../libs/react-js/testing/router/stub-router-context'

import AppLayout from '../../components/app-layout';

const {TestUtils} = React.addons;

describe('AppLayout', ()=> {

  it('should exist', () => {
    expect(AppLayout).to.not.be.undefined;
  });

  it('renders correct initial height', () => {
    const Subject = StubRouterContext(AppLayout, {loading: true});

    const element = TestUtils.renderIntoDocument(<Subject/>);
    const height = TestUtils.findRenderedDOMComponentWithClass(element, "transition-content-wrapper").getDOMNode().style.height;
    expect(height).to.equal("500px");
  });
});
