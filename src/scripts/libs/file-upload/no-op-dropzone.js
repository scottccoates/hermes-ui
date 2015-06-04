import Dropzone from 'dropzone';
import sleep from 'src/scripts/libs/js-utils/async/sleep';

export default
class NoOpDropzone extends Dropzone {

  async _updateProgress(files) {
    const total = 100;

    const totalBytes = files
      .map((file)=>file.size)
      .reduce((total, size)=>total + size);

    var loaded = 0;

    while (loaded < total) {
      loaded += (Math.random() * 10);

      if (loaded > total) loaded = total;

      files.forEach((file)=> {
        var bytesSent = file.size * (loaded / 100);
        file.upload = {bytesSent, totalBytes, total: file.size};
      });

      this.updateTotalUploadProgress();

      await sleep(200);
    }
  }

  async uploadFiles(files) {
    await this._updateProgress(files);
    this._finished(files, 'OK', {})
  }
}
