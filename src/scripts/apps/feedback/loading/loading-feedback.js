import NProgress from 'nprogress';

NProgress.configure({ease: 'ease', speed: 100, trickleRate: .2, trickleSpeed: 200});

function start() {
  NProgress.start();
}

function stop() {
  NProgress.done();
}


export default {start, stop};
