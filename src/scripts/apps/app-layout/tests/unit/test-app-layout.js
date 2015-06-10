/* jshint -W030 */
'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import StubRouterContext from 'src/scripts/libs/react-js/testing/router/stub-router-context.js!jsx'
import AppLayout from 'src/scripts/apps/app-layout/components/app-layout.js!jsx';

describe('AppLayout', ()=> {

  it('should exist', () => {
    expect(AppLayout).to.not.be.undefined;
  });

  it('renders correct initial height', () => {
    const Subject = StubRouterContext(AppLayout, {loading: true});

    const element = TestUtils.renderIntoDocument(<Subject/>);
    const height = TestUtils.scryRenderedDOMComponentsWithClass(element, "transition-content-wrapper")[0].getDOMNode().style.height;
    expect(height).to.equal("500px");
  });
});
