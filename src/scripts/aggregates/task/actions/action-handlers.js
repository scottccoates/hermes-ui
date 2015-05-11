import TaskActions from 'src/scripts/aggregates/task/actions/actions';

import container from 'src/scripts/settings/di';

const taskAPI = container.get('TaskAPI');

TaskActions.loadTasks.listenAndPromise(taskAPI.getTasks);

