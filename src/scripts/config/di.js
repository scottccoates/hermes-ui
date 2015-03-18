/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from 'src/app/components/file-upload';

import NewMI from 'src/app/management-item/new/new-management-item';

import Dropzone from 'dropzone';
import NoOpDropzone from 'src/lib/file-upload/no-op-dropzone';

const container = Intravenous.create({
  onDispose: function (obj, serviceName) {
    console.log('wtf!!!!!', obj, serviceName);
  }
});

NewMI.$inject = ["FileUpload"];
container.register("NewMI", NewMI);

FileUpload.$inject = ["DropzoneFactory"];
container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

export default container;

