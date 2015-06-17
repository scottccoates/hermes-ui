/* jshint -W030 */
'use strict';

import React from 'react/addons';

import TestUtilsHelpers from '../../../../libs/react-js/testing/react-js/react-test-utils-helper';
import StubRouterContext from '../../../../libs/react-js/testing/router/stub-router-context'

import MIForm from '../../components/new-management-item/management-item-form';

const {TestUtils} = React.addons;

describe('Management Item Form', ()=> {

  describe('Submit Form', ()=> {
    const MIFormComponent = MIForm().dependency;

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
