import TaskActions from 'src/apps/task/actions/actions';

import TaskAPI from 'src/aggregates/task/api/task-api';

TaskActions.loadTasks.listenAndPromise(TaskAPI.getTasks);
