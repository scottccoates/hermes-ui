import Reflux from 'reflux';

import LoadingFeedback from 'src/apps/feedback/components/loading/loading-feedback';

import MIActions from 'src/apps/management-item/actions/actions';
import ReactMixinActions from 'src/libs/react-js/actions/actions';

MIActions.createMIFileUpload.listen((file)=> {
  LoadingFeedback.start();
});

MIActions.createMIFileUpload.progressed.listen((progress)=> {
  LoadingFeedback.setProgress(progress / 100);
});

MIActions.createMIFileUpload.completed.listen(()=> {
  LoadingFeedback.done();

});

ReactMixinActions.dataTransition.listen(LoadingFeedback.start);

ReactMixinActions.dataTransition.completed.listen(LoadingFeedback.done);
