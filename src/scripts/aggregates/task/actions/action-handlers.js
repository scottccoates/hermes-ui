import TaskActions from 'src/aggregates/task/actions/actions';

import container from 'src/settings/di';

const taskAPI = container.get('TaskAPI');

TaskActions.loadTasks.listenAndPromise(taskAPI.getTasks);

