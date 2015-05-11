import Reflux from 'reflux';

import Immutable from 'immutable';

import TaskActions from 'src/scripts/aggregates/task/actions/actions';

export default function () {
  const taskListStore = Reflux.createStore({
    listenables: TaskActions,

    _data: Immutable.List(),

    get data() {
      return this._data;
    },

    getInitialState: function () {
      return this._data;
    },

    onLoadTasksCompleted(tasks) {
      this._data = Immutable.List(tasks);
      this.trigger(this._data);
    }
  });

  return taskListStore;
}
