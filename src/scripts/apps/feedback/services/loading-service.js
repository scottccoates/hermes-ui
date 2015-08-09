import NProgress from 'nprogress';

import Bacon from 'bacon';

import log from 'loglevel';

// NProgress is a singleton anyway, so might as well make these global as well
NProgress.configure({ease: 'ease', speed: 100, trickleRate: .2, trickleSpeed: 200});

const startStream = new Bacon.Bus();
const doneStream  = new Bacon.Bus();

const actionStream = startStream.map(1)
  .merge(doneStream.map(-1))
  .scan(0, (acc, actionValue)=> acc + actionValue);

const onStream  = actionStream.filter(val => val === 1);
const offStream = actionStream.filter(val => val === 0);

onStream.subscribe(()=> {
  NProgress.start();
});

offStream.subscribe(()=> {
  NProgress.done();
});


const loadingService = {
  start(){
    startStream.push()
  },

  done() {
    doneStream.push()
  },

  setProgress(progress) {
    NProgress.set(progress);
  }
};

export default loadingService;
