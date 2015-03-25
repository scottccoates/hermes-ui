import Reflux from 'reflux';
import NProgress from 'nprogress';

import MIActions from 'src/apps/management-item/actions';

MIActions.newMIFileUpload.listen((file)=> {
  NProgress.start();
});

MIActions.newMIFileUpload.progressed.listen((progress)=> {
  NProgress.set(progress / 100);
});

MIActions.newMIFileUpload.completed.listen(()=> {
  console.log('yay');
});
