/* jshint -W030 */
'use strict';

import React from 'react/addons';

import StubRouterContext from '../../../../libs/react-js/testing/router/stub-router-context'

import FileUpload from '../../../../libs/react-js/components/file-upload';

const {TestUtils} = React.addons;

describe('FileUpload', ()=> {

  it('should exist', () => {
    expect(FileUpload).to.not.be.undefined;
  });

  describe('Dropzone Options', ()=> {
    const dropzoneSpy = {on: sinon.spy()};
    const dropzoneFactoryStub = {get: sinon.stub().returns(dropzoneSpy)};

    const FileUploadComponent = FileUpload(dropzoneFactoryStub).dependency;

    var element;

    beforeEach(()=> {
      element = TestUtils.renderIntoDocument(<FileUploadComponent/>);
    });

    it('passes correct props to dropzone', () => {
      expect(dropzoneSpy.on).to.have.been.calledWith("addedfile", element.props.onAddedFile);
      expect(dropzoneSpy.on).to.have.been.calledWith('totaluploadprogress', element.props.onProgressed);
      expect(dropzoneSpy.on).to.have.been.calledWith("queuecomplete", element.props.onComplete);
    });

    it('removes dropzone default addedfile option', () => {
      expect(dropzoneFactoryStub.get).to.have.been.calledWith(sinon.match.any, sinon.match.has('addedfile'));
    });

    it('provides dropzone options to dropzone.', () => {
      element = TestUtils.renderIntoDocument(<FileUploadComponent url="http://test.com"/>);

      expect(dropzoneFactoryStub.get).to.have.been.calledWith(sinon.match.any, sinon.match.has('url'));
    });
  });
});
