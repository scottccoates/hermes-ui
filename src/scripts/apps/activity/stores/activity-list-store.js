import Reflux from 'reflux';

import Immutable from 'immutable';

import ActivityActions from 'src/aggregates/activity/actions/actions';

export default function () {
  const activityListStore = Reflux.createStore({
    listenables: ActivityActions,

    _data: Immutable.List(),

    get data() {
      return this._data;
    },

    getInitialState: function () {
      return this._data;
    },

    onLoadActivitiesCompleted(activities) {
      this._data = Immutable.List(activities);
      this.trigger(this._data);
    }
  });

  return activityListStore;
}
