import NProgress from 'nprogress';

import Bacon from 'bacon';

import Actions from 'src/apps/feedback/actions/actions';

NProgress.configure({ease: 'ease', speed: 100, trickleRate: .2, trickleSpeed: 200});

const startStream = new Bacon.Bus();
const doneStream = new Bacon.Bus();

function start() {
  startStream.push()
}

function done() {
  doneStream.push()
}

function setProgress(progress) {
  NProgress.set(progress);
}

const actionStream = startStream.map(1)
  .merge(doneStream.map(-1))
  .scan(0, (acc, actionValue)=> acc + actionValue);

const onStream = actionStream.filter(val => val === 1);
const offStream = actionStream.filter(val => val === 0);

onStream.subscribe(()=> {
  NProgress.start();
  Actions.loadData();
});

offStream.subscribe(()=> {
  NProgress.done();
  Actions.loadData.completed();
});

export default {start, done, setProgress};
