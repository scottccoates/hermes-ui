import { Store } from 'flummox';

import Immutable from 'immutable';

import DependencyProvider from '/src/scripts/libs/dependency-injection/utils/dependency-provider';

export default function () {
  class TaskListStore extends Store {

    constructor(flux) {
      super();

      const taskActions = flux.getActionIds('task');
      this.register(taskActions.save, this.onSave);

      this.state = {
        tasks: Immutable.List()
      };
    }

    onSave(task) {
      this.setState({
        tasks: this.state.tasks.concat([task])
      });
    }

  }

  return new DependencyProvider(TaskListStore);
}
