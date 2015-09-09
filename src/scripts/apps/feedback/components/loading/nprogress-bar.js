import NProgress from 'nprogress';

NprogressBar.prototype.updateProgress = function (progress) {

  // do this every call, because nprogress is a singleton and since the last call (to this instance), nprogress may have been re-configured
  NProgress.configure(this._config);

  if (progress) {
    if (progress >= 100) {
      NProgress.done();
    }
    else {
      NProgress.set(progress / 100);
    }
  }
  else {
    NProgress.start();
  }
};

export default function NprogressBar(config) {
  this._config = config;
}
