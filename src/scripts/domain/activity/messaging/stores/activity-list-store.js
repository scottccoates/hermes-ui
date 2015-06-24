import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from 'src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class ActivityListStore extends Store {

    constructor(flux) {
      super();

      const taskActions = flux.getActionIds('activity');
      this.register(taskActions.addToCollection, this.onSave);

      this.state = {
        activities: Immutable.List()
      };
    }

    onSave(activity) {
      this.setState({
        activities: this.state.activities.concat([activity])
      });
    }

  }

  return new DependencyProvider(ActivityListStore);
}
