/* jshint -W030 */
'use strict';

import React from 'react/addons';

import TestUtilsHelpers from 'src/scripts/libs/react-js/testing/react-js/react-test-utils-helper';
import StubRouterContext from 'src/scripts/libs/react-js/testing/router/stub-router-context.js!jsx'

import MIForm from 'src/scripts/apps/management-item/components/new-management-item/management-item-form.js!jsx';

const {TestUtils} = React.addons;

describe('Management Item Form', ()=> {

  it('should exist', () => {
    expect(MIForm).to.not.be.undefined;
  });

  describe('Submit Form', ()=> {
    const MIFormComponent = MIForm().componentType;

    const anEmptyString = '';

    it('validates input', (done) => {
      const Subject = StubRouterContext(MIFormComponent, {onValidate: onValidate});

      const element = TestUtils.renderIntoDocument(<Subject/>);

      const contractNameNode = TestUtilsHelpers.findRenderedDOMComponentWithId(element, 'mi-form-contract-name');
      TestUtils.Simulate.change(contractNameNode, {target: {value: anEmptyString}});

      const formNode = TestUtils.findRenderedDOMComponentWithTag(element, 'form');
      TestUtils.Simulate.submit(formNode);

      function onValidate(valid) {
        expect(valid).to.be.false;
        done();
      }
    });
  });
});
