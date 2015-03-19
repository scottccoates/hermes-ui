import Dropzone from 'dropzone';

export default
class NoOpDropzone extends Dropzone {

  _updateProgress(files) {
    const retVal = new Promise((resolve, reject)=> {

      const total = 100;

      const totalBytes = files
          .map((file)=>file.size)
          .reduce((total, size)=>total + size);

      (function _makeProgress(loaded) {

        if (loaded < total) {
          loaded += (Math.random() * 10);

          if (loaded > 100) loaded = 100;

          files.forEach((file)=> {
            var bytesSent = file.size * (loaded / 100);
            file.upload = {bytesSent, totalBytes, total: file.size};
          });

          this.updateTotalUploadProgress();

          setTimeout(() => _makeProgress.call(this, loaded), 200);
        }
        else {
          resolve();
        }
      }).call(this, 0);

    });

    return retVal;
  }

  uploadFiles(files) {
    return this._updateProgress(files)
        .then(()=>this._finished(files, 'OK', {}));
  }
}
