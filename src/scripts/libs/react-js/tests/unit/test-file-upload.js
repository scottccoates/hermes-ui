/* jshint -W030 */
'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import StubRouterContext from 'src/scripts/libs/react-js/testing/router/stub-router-context.js!jsx'
import FileUpload from 'src/scripts/libs/react-js/components/file-upload.js!jsx';


describe('FileUpload', ()=> {

  it('should exist', () => {
    expect(FileUpload).to.not.be.undefined;
  });

  it('passes correct props to dropzone', () => {
    const dropzoneSpy = {on: sinon.spy()};
    const dropzoneFactoryStub = {get: sinon.stub().returns(dropzoneSpy)};

    const FileUploadElement = FileUpload(dropzoneFactoryStub).componentType;

    const element = TestUtils.renderIntoDocument(<FileUploadElement/>);
    expect(dropzoneSpy.on).to.have.been.calledWith("addedfile", element.props.onAddedFile);
    expect(dropzoneSpy.on).to.have.been.calledWith('totaluploadprogress', element.props.onProgressed);
    expect(dropzoneSpy.on).to.have.been.calledWith("queuecomplete", element.props.onComplete);
  });
});
