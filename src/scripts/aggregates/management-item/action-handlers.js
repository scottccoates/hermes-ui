import Reflux from 'reflux';
import Pace from 'pace';

import Actions from './actions';

Actions.newMIFileUpload.listen((file)=> {
  //Pace.start({
  //  elements: {
  //    selectors: ['.my-page']
  //  }
  //});
  console.log(file);
});
