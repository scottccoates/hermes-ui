import Dropzone from 'dropzone';

export default
class NoOpDropzone extends Dropzone {

  uploadFiles(files) {
    return this._finished(files, 'OK', {});
  }
}
