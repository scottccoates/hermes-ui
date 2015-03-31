import Reflux from 'reflux';

const Actions = Reflux.createActions({
  "loadTasks": {
    asyncResult: true
  }
});

export default Actions;
