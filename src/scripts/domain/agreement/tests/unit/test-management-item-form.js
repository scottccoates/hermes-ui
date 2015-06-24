/* jshint -W030 */
'use strict';

import React from 'react/addons';

import MIForm from '../../components/new-agreement/agreement-form';

import noop from '../../../../libs/js-utils/functions/noop';

const {TestUtils} = React.addons;

describe('Management Item Form', ()=> {

  it('should exist', () => {
    expect(MIForm).to.be.ok;
  });

  describe('Submit Form', ()=> {
    const eventFake = {preventDefault: noop};

    const validationStub = {validate: sinon.stub().yields()};
    const propsOnValidateSpy = sinon.spy();

    const miServiceSpy = {addToCollection: sinon.spy()};


    const MIFormComponent = MIForm(miServiceSpy).dependency;

    MIFormComponent.prototype.refs = {validation: validationStub};
    MIFormComponent.prototype.props = {onValidate: propsOnValidateSpy};
    MIFormComponent.prototype.state = {formData: {}};


    it('checks if form is valid', () => {
      MIFormComponent.prototype.onSubmit(eventFake);

      expect(propsOnValidateSpy).to.have.been.called;
    });

    it('fires action if valid form', () => {
      MIFormComponent.prototype.onSubmit(eventFake);

      expect(miServiceSpy.addToCollection).to.have.been.called;
    });
  });
});
