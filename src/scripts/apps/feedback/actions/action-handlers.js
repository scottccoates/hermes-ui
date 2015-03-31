import Reflux from 'reflux';

import LoadingFeedback from 'src/apps/feedback/components/loading/loading-feedback';

import MIActions from 'src/apps/management-item/actions/actions';
import TaskActions from 'src/apps/task/actions/actions';

MIActions.newMIFileUpload.listen((file)=> {
  LoadingFeedback.start();
});

MIActions.newMIFileUpload.progressed.listen((progress)=> {
  LoadingFeedback.set(progress / 100);
});

MIActions.newMIFileUpload.completed.listen(()=> {
  console.log('yay');
});

TaskActions.loadTasks.listen(LoadingFeedback.start);

TaskActions.loadTasks.completed.listen(LoadingFeedback.done);
