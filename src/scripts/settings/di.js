/* jshint -W030 */
'use strict';

import Intravenous from 'intravenous';

import FileUpload from 'src/libs/components/file-upload';

import MI from 'src/apps/management-item/management-item';
import NewMI from 'src/apps/management-item/new/new-management-item';
import MIForm from 'src/apps/management-item/new/management-item-form';

import Dropzone from 'dropzone';
import NoOpDropzone from 'src/libs/file-upload/no-op-dropzone';

const container = Intravenous.create({
  onDispose: function (obj, serviceName) {
    console.log('wtf!!!!!', obj, serviceName);
  }
});

container.register("MI", MI);

NewMI.$inject = ["FileUpload"];
container.register("NewMI", NewMI);

container.register("MIForm", MIForm);

FileUpload.$inject = ["DropzoneFactory"];
container.register("FileUpload", FileUpload);
container.register("Dropzone", NoOpDropzone);

export default container;

